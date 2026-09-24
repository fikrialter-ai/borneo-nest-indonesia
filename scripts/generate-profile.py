from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from pathlib import Path
from PIL import Image

out='public/company-profile.pdf'
c=canvas.Canvas(out,pagesize=(595.28,841.89))
c.setTitle('Borneo Nest Indonesia | Company Profile')
c.setAuthor('Borneo Nest Indonesia')
forest=HexColor('#123e32'); muted=HexColor('#657363'); paper=HexColor('#fafbf7')
def para(text,x,y,w,size=11,color=muted):
 p=Paragraph(text,ParagraphStyle('body',fontName='Helvetica',fontSize=size,leading=size*1.6,textColor=color)); _,h=p.wrap(w,800); p.drawOn(c,x,y-h); return y-h
c.setFillColor(paper);c.rect(0,0,596,842,fill=1,stroke=0)
c.setFillColor(forest);c.rect(0,650,596,192,fill=1,stroke=0)
c.drawImage('public/assets/logo.png',43,755,width=55,height=40,mask='auto')
c.setFillColor(paper);c.setFont('Helvetica-Bold',19);c.drawString(113,775,'BORNEO NEST INDONESIA')
c.setFont('Helvetica',9);c.drawString(113,758,'COMPANY PROFILE')
c.setFont('Helvetica',26);c.drawString(43,710,'Premium Indonesian Bird Nest')
c.setFont('Helvetica',21);c.drawString(43,679,'From Kalimantan')
y=para('Borneo Nest Indonesia is a bird nest processing and trading company focused on premium quality bird nest from Kalimantan, Indonesia.',43,622,509,12)
c.drawImage(ImageReader(Image.open('public/assets/bowl.webp')),43,348,width=509,height=208,mask='auto',preserveAspectRatio=False)
para('Illustrative product image. Request current batch photos before ordering.',43,338,509,8)
c.setFillColor(forest);c.setFont('Helvetica',20);c.drawString(43,292,'Our collection')
items=[('Premium Bowl Bird Nest','Premium grade. Whole bowl-shaped nests with refined appearance.'),('Corner Bird Nest','Premium / Standard grades. Naturally formed corner-shaped nests.'),('Broken / Mesh Bird Nest','Processed grade. Cleaned pieces and strands for further processing.')]
y=265
for title,desc in items:
 c.setFillColor(forest);c.setFont('Helvetica-Bold',11);c.drawString(43,y,title)
 para(desc,43,y-9,509,10);y-=57
c.setStrokeColor(HexColor('#dce1d7'));c.line(43,55,552,55)
para('Borneo Nest Indonesia | Kalimantan, Indonesia',43,43,440,8);para('01',532,43,25,8)
c.showPage();c.setFillColor(paper);c.rect(0,0,596,842,fill=1,stroke=0)
c.setFillColor(forest);c.setFont('Helvetica',27);c.drawString(43,780,'Care at every stage.')
y=para('Professional cleaning, considered grading and quality control support our approach to dependable business partnerships.',43,755,509,12)
c.setFont('Helvetica-Bold',12);c.setFillColor(forest);c.drawString(43,680,'Our process')
process=[('01','Raw Material Selection'),('02','Sorting'),('03','Manual Cleaning'),('04','Grading'),('05','Quality Control'),('06','Premium Packaging')]
for i,(num,title) in enumerate(process):
 x=43+(i%2)*265;y=643-(i//2)*36
 c.setFillColor(muted);c.setFont('Helvetica',10);c.drawString(x,y,num)
 c.setFillColor(forest);c.drawString(x+28,y,title)
c.setFont('Helvetica-Bold',12);c.drawString(43,520,'Quality approach')
para('Manual cleaning without chemical bleaching. Products are graded by quality characteristics and inspected before delivery. A product-origin tracking system is planned and is not yet available.',43,501,509,11)
c.setFillColor(forest);c.setFont('Helvetica-Bold',12);c.drawString(43,420,'Cleaning services & partnerships')
para('We welcome inquiries from traders, distributors and premium business buyers. Our cleaning service includes sorting, manual cleaning, grading and preparation for packaging. Share your product, quantity and destination requirements for a tailored discussion.',43,401,509,11)
c.setFillColor(forest);c.setFont('Helvetica-Bold',12);c.drawString(43,294,'Our direction')
para('We aim to build long-term farmer partnerships, support local livelihoods and develop responsible production practices. Goodlife Birdnest is our future wellness product direction; products are in development.',43,275,509,11)
c.setFillColor(HexColor('#e8eee1'));c.roundRect(43,87,509,102,5,fill=1,stroke=0)
c.setFillColor(forest);c.setFont('Helvetica-Bold',14);c.drawString(62,162,'Start a business conversation')
c.setFont('Helvetica',12);c.drawString(62,139,'WhatsApp: +62 812-5464-2859')
c.linkURL('https://wa.me/6281254642859',(62,132,370,156),relative=0)
para('Availability, pricing, specifications and delivery requirements are confirmed per order.',62,123,460,9)
c.setStrokeColor(HexColor('#dce1d7'));c.line(43,55,552,55)
para('Borneo Nest Indonesia | Company Profile',43,43,440,8);para('02',532,43,25,8)
c.save()

