import { test, expect } from "@playwright/test";

test("hero video plays silently, pauses on request and stops outside the hero", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const video = page.locator(".hero-video");
  await expect(video).toBeVisible();
  await expect
    .poll(() => video.evaluate((v) => v.readyState))
    .toBeGreaterThanOrEqual(2);
  await expect.poll(() => video.evaluate((v) => v.paused)).toBe(false);
  expect(await video.evaluate((v) => v.muted && v.loop && v.playsInline)).toBe(
    true,
  );
  await page.getByRole("button", { name: "Pause animation" }).click();
  await expect.poll(() => video.evaluate((v) => v.paused)).toBe(true);
  await page.getByRole("button", { name: "Play animation" }).click();
  await expect.poll(() => video.evaluate((v) => v.paused)).toBe(false);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((v) => v.paused)).toBe(true);
  await page.locator(".hero").scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((v) => v.paused)).toBe(false);
});

test("reduced motion uses a still image without downloading video", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const videoRequests = [];
  page.on("request", (r) => {
    if (r.url().includes("swiftlet-hero.mp4")) videoRequests.push(r.url());
  });
  await page.goto("/");
  await expect(page.locator(".hero-video")).toHaveCount(0);
  await expect(page.locator(".hero-photo")).toHaveAttribute(
    "src",
    "/assets/swiftlet-hero-poster.webp",
  );
  await page.locator(".hero-photo").evaluate((img) => img.decode());
  expect(videoRequests).toEqual([]);
});

test("failed video keeps a loaded still image and removes playback controls", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("**/assets/swiftlet-hero.mp4", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator(".hero-video")).toHaveCount(0);
  await page.locator(".hero-photo").evaluate((img) => img.decode());
  expect(
    await page.locator(".hero-photo").evaluate((img) => img.naturalWidth),
  ).toBeGreaterThan(0);
  await expect(page.locator(".hero-video-toggle")).toHaveCount(0);
});
