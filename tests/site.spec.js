import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/about",
  "/products",
  "/products/premium-bowl",
  "/products/corner",
  "/products/broken-mesh",
  "/products/yenping-kotak",
  "/process",
  "/quality",
  "/sustainability",
  "/gallery",
  "/contact",
];
test("every route renders, assets load, and no horizontal overflow at desktop, tablet and mobile", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      await page.locator("footer").scrollIntoViewIfNeeded();
      await page.evaluate(async () => {
        await Promise.all(
          [...document.images].map((i) => i.decode().catch(() => {})),
        );
      });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}`,
      ).toBe(true);
      expect(
        await page
          .locator("img")
          .evaluateAll((imgs) =>
            imgs.every((i) => i.complete && i.naturalWidth > 0),
          ),
        route,
      ).toBe(true);
    }
  }
  expect(errors).toEqual([]);
});
test("product inquiry, validation and WhatsApp handoff preserve customer details", async ({
  page,
}) => {
  await page.goto("/products/corner");
  await page.getByRole("link", { name: "Request Product Information" }).click();
  await expect(page.locator("textarea")).toHaveValue(/Corner Bird Nest/);
  await page.getByRole("button", { name: "Send Inquiry", exact: true }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await page.getByLabel("Name", { exact: false }).first().fill("Borneo buyer");
  await page.getByLabel("Company", { exact: false }).fill("Trade & Co");
  await page.getByLabel("Email", { exact: false }).fill("buyer@example.com");
  await page.getByLabel("WhatsApp Number").fill("+62 812 0000 0000");
  await page.getByLabel("Country").fill("Indonesia");
  await page.getByLabel("Inquiry Type").selectOption("Bulk Order");
  await page.getByRole("button", { name: "Send Inquiry", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "It has not been sent yet",
  );
  const url = new URL(
    await page
      .getByRole("link", { name: "Continue to WhatsApp" })
      .getAttribute("href"),
  );
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/6281254642859");
  expect(url.searchParams.get("text")).toContain("Trade & Co");
  expect(url.searchParams.get("text")).toContain("Bulk Order");
  await page.getByLabel("Company", { exact: false }).fill("Updated company");
  await expect(page.getByRole("status")).toHaveCount(0);
});
test("mobile menu, locale persistence, FAQ, gallery keyboard and download", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page.getByRole("navigation")).toBeHidden();
  await page
    .getByRole("button", { name: "Switch to Bahasa Indonesia" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  await page.reload();
  await expect(page.locator("h1")).toContainText("Dari Kalimantan");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await page.goto("/");
  await page.locator("summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await page.goto("/gallery");
  await page
    .getByRole("button", { name: "Production Gallery", exact: true })
    .click();
  await expect(page.locator(".gallery-grid figure")).toHaveCount(1);
  await page.getByRole("button", { name: /Enlarge/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await page.getByRole("button", { name: "All", exact: true }).click();
  await page
    .getByRole("button", { name: /Enlarge/ })
    .first()
    .click();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".lightbox-caption")).toContainText(
    "Corner bird nest",
  );
  await page.keyboard.press("Escape");
  const response = await page.request.get("/company-profile.pdf");
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).subarray(0, 4).toString()).toBe("%PDF");
  await page.goto("/missing");
  await expect(page.locator("h1")).toContainText("could not be found");
});
test("accessibility checks on main interactions", async ({ page }) => {
  for (const route of ["/", "/products", "/contact", "/gallery"]) {
    await page.goto(route);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
  }
});
