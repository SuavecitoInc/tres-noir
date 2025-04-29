import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import stream from "stream"
import chromium from "@sparticuz/chromium"
import puppeteer from "puppeteer-core"
// const puppeteer = require("puppeteer-core")
import { google } from "googleapis"
import formData from "form-data"
import Mailgun from "mailgun.js"

chromium.setGraphicsMode = false

interface FormData {
  storeName: string
  storeTel: string
  address: string
  city: string
  stateProvince: string
  postalCode: string
  country: string
  owners: string
  authorizedBuyerContact: string
  businessType: string
  question1: string
  averageRetailPrice: string
  brand1: string
  brand2: string
  brand3: string
  question4: string
  question5: string
  question6: string
  date: string
}
// mailgun
const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_SENDING_KEY as string,
})

async function sendEmail(
  data: FormData,
  pdfBuffer: Uint8Array<ArrayBufferLike>
) {
  try {
    const { storeName, date } = data
    const sendingDomain = process.env.MAILGUN_SENDING_DOMAIN as string
    const sendTo = process.env.MAILGUN_SEND_TO as string
    const ccList = process.env.MAILGUN_CC_LIST as string

    // const fileData = await fsPromises.readFile(filepath)
    const file = {
      data: new stream.PassThrough().end(Buffer.from(pdfBuffer)),
      filename: `${storeName}-dealer-application.pdf`,
      // contentType: "application/pdf",
    }
    const msg = await mg.messages.create(sendingDomain, {
      from: `${storeName} <noreply@${sendingDomain}>`,
      to: [sendTo],
      cc: ccList.split(",").map(email => email.trim()),
      subject: `New Dealer Application from ${storeName} on ${date}`,
      text: "New Dealer Application attached.",
      html: "<h1>New Dealer Application attached.</h1>",
      attachment: [file],
    })
    console.log(msg)
    return msg
  } catch (err: any) {
    console.log("Error sending email", err)
  }
}

// function to dummy up the html
function generateHTML(data: FormData) {
  const {
    storeName,
    storeTel,
    address,
    city,
    stateProvince,
    postalCode,
    country,
    owners,
    authorizedBuyerContact,
    businessType,
    question1,
    averageRetailPrice,
    brand1,
    brand2,
    brand3,
    question4,
    question5,
    question6,
    date,
  } = data
  console.log("data", data)

  // example of styles
  const style = `
    <style>
      body {
        font-size: .6em;
        font-family: 'Open Sans' !important;
      }
      b {
        font-weight: 600 !important;
      }
    </style>
  `
  // html sections
  const sections = `
    <div style="max-width: 800px; margin: 0 auto;">
      <div style="margin: 0 auto; text-align: center; margin-top: 20px;">
        <img style="width: 400px; height: auto;"
          src="data:image/png;base64, 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"
          alt="Logo" />
      </div>
      <div style="text-align: center;">
        <h1 style="font-weight: bold;">NEW DEALER APPLICATION</h1>
        <p style="font-weight: bold;">TEL 714-656-4796</p>
        <p style="font-weight: bold;">www.TRESNOIR.com</p>
      </div>
      <div style="width: 100%;">
        <h3 style="font-weight: bold;">INFORMATION</h3>
        <div style="width: 100%; display: flex; flex-direction: row; margin-bottom: 10px;">
          <div style="display: flex; flex-direction: row; gap: 5px; flex-grow: 1;"><span style="font-weight: bold;">STORE
              NAME
            </span><span class="variable">${storeName}</span></div>
          <div style="display: flex; flex-direction: row; gap: 5px; flex-grow: 1;"><span
              style="font-weight: bold;">TEL</span>
            <span class="variable">${storeTel}</span>
          </div>
        </div>
        <h3 style="font-weight: bold;">STORE ADDRESS</h3>
        <div style="width: 100%; display: flex; flex-direction: row; margin-bottom: 10px;">
          <div style="display: flex; flex-direction: row; gap: 5px; flex-grow: 1;"><span style="font-weight: bold;">ADDRESS
            </span><span class="variable">${address}</span></div>
        </div>
        <div style="width: 100%; display: flex; flex-direction: row; margin-bottom: 10px;">
          <div style="display: flex; flex-direction: row; gap: 5px; flex-grow: 1;"><span style="font-weight: bold;">CITY
            </span><span class="variable">${city}</span></div>
          <div style="display: flex; flex-direction: row; gap: 5px; flex-grow: 1;"><span style="font-weight: bold;">STATE /
              PROVINCE</span>
            <span class="variable">${stateProvince}</span>
          </div>
          <div style="display: flex; flex-direction: row; gap: 5px; flex-grow: 1;"><span
              style="font-weight: bold;">ZIP</span>
            <span class="variable">${postalCode}</span>
          </div>
          <div style="display: flex; flex-direction: row; gap: 5px; flex-grow: 1;"><span
              style="font-weight: bold;">COUNTRY</span>
            <span class="variable">${country}</span>
          </div>
        </div>
        <h3 style="font-weight: bold;">BUSINESS INFORMATION</h3>
        <div style="width: 100%; display: flex; flex-direction: row; margin-bottom: 10px;">
          <div style="display: flex; flex-direction: row; gap: 5px; flex-grow: 1;"><span style="font-weight: bold;">TYPE OF
              BUSINESS
            </span><span style="margin-left: 50px;">${businessType}</span></div>
        </div>
        <div style="width: 100%; display: flex; flex-direction: row; margin-bottom: 10px;">
          <div style="display: flex; flex-direction: row; gap: 5px; flex-grow: 1;"><span style="font-weight: bold;">OWNER(S)
            </span><span class="variable">${owners}</span></div>
        </div>
        <div style="width: 100%; display: flex; flex-direction: row; margin-bottom: 10px;">
          <div style="display: flex; flex-direction: row; gap: 5px; flex-grow: 1;"><span
              style="font-weight: bold;">AUTHORIZED BUYER / CONTACT
            </span><span class="variable">${authorizedBuyerContact}</span></div>
        </div>
        <p style="font-weight: bold;">Please complete the following:</p>
        <div style="width: 100%; display: flex; flex-direction: row; margin-bottom: 10px;">
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <span style="font-weight: bold;">1. Do
              you currently carry other sunglass brands? If so, what brands?
            </span>
            <span class="variable">${question1}</span>
          </div>
        </div>
        <div style="width: 100%; display: flex; flex-direction: row; margin-bottom: 10px;">
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <span style="font-weight: bold;">2. What is the average retail price of accessories / watches / handbags sold in
              your store?
            </span>
            <span>${averageRetailPrice}</span>
          </div>
        </div>
        <div style="width: 100%; display: flex; flex-direction: row; margin-bottom: 10px;">
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <span style="font-weight: bold;">3. List 3 of your current top selling brands:
            </span>
            <div style="display: flex; flex-direction: column; gap: 5px;">
              <div>
                <span style="margin-left: 20px; font-weight: bold;">1. </span><span class="variable">${brand1}</span>
              </div>
              <div>
                <span style="margin-left: 20px; font-weight: bold;">2. </span><span class="variable">${brand2}</span>
              </div>
              <div>
                <span style="margin-left: 20px; font-weight: bold;">3. </span><span class="variable">${brand3}</span>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 100%; display: flex; flex-direction: row; margin-bottom: 10px;">
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <span style="font-weight: bold;">4. How would you describe the demographic of your customer?
            </span>
            <span class="variable">${question4}</span>
          </div>
        </div>
        <div style="width: 100%; display: flex; flex-direction: row; margin-bottom: 10px;">
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <span style="font-weight: bold;">5. Briefly describe the look and feel of your store.
            </span>
            <span class="variable">${question5}</span>
          </div>
        </div>
        <div style="width: 100%; display: flex; flex-direction: row; margin-bottom: 10px;">
          <div style="display: flex; flex-direction: column; gap: 5px;">
            <span style="font-weight: bold;">6. List of Business Social Media Accounts.
            </span>
            <span class="variable">${question6}</span>
          </div>
        </div>
        <div style="width: 100%; display: flex; flex-direction: row; margin-bottom: 10px;">
          <div style="display: flex; flex-direction: row; gap: 5px; flex-grow: 1;"><span style="font-weight: bold;">SALES
              REP NAME
            </span><span class="variable">ONLINE</span></div>
          <div style="display: flex; flex-direction: row; gap: 5px; flex-grow: 1;"><span
              style="font-weight: bold;">DATE</span>
            <span class="variable">${date}</span>
          </div>
        </div>
      </div>
    </div>
  `
  // create the html string (dummy template)
  const html = `
      <html>
        <head>
          <meta charset="utf8">
          <title>Suavecito MAP Agreement</title>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
        </head>
        <body>
          ${style}
          ${sections}
        </body>
      </html>
    `

  return html
}
// use puppeteer to create a PDF from the URL
async function printPDF(data: FormData) {
  // get the html string
  // const htmlString = generateHTML(data)
  const htmlString = `<p>Hello</p>`
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath()),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  })
  const page = await browser.newPage()
  // don't know why I need to convert to string if it is already a string, but this was necessary
  await page.setContent(htmlString)
  // await page.setContent(htmlString.toString(), {
  //   waitUntil: ["load", "networkidle0", "domcontentloaded"],
  // })
  // const outputPath = path.join(__dirname, "output.pdf")
  const pdf = await page.pdf({
    // path: outputPath,
    format: "A4", // or any other format
    margin: {
      top: "20px",
      right: "20px",
      bottom: "20px",
      left: "20px",
    },
  })

  await browser.close()
  return {
    pdf: pdf,
  }
}
// Downloaded from while creating credentials of service account
const SCOPES = ["https://www.googleapis.com/auth/drive.file"]

async function uploadFile(
  pdfBuffer: Uint8Array<ArrayBufferLike>,
  fileName: string,
  folderId: string
) {
  console.log("Uploading file to Google Drive...")
  console.log("File name:", fileName)
  console.log("Folder ID:", folderId)
  console.log("PDF Buffer:", pdfBuffer)
  console.log("Buffer length:", pdfBuffer.length)
  try {
    const drive = google.drive({
      version: "v3",
      auth: new google.auth.JWT({
        email: process.env.GOOGLE_SERVICE_EMAIL,
        key: process.env.GOOGLE_SERVICE_PK,
        scopes: SCOPES,
        subject: "info@tresnoir.com", // upload as this user
      }),
    })

    const fileMetadata = {
      name: fileName,
      parents: folderId ? [folderId] : ["root"], // Optional: Specify parent folder ID
    }

    const media = {
      mimeType: "application/pdf", // Adjust if needed, e.g., 'image/jpeg', 'application/octet-stream
      body: new stream.PassThrough().end(Buffer.from(pdfBuffer)), // Convert buffer to stream
    }

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id, webViewLink",
    })

    console.log("File uploaded successfully!")
    console.log("File ID:", response.data.id)
    console.log("File URL:", response.data.webViewLink)
    return response.data
  } catch (error) {
    console.error("Error uploading file:", error)
    throw error
  }
}

export default async function newDealerApplication(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const { body } = req
    console.log("Request body:", body)
    if (!body) {
      throw new Error("No body found")
    }

    const fileName = `${body.storeName} - ${body.date}.pdf` // The name the file will have in Google Drive
    const folderId = "1G-s2adPPVtVf4125NDl9dV1uJxujsg3v" // Replace with your folder ID, or leave as null/undefined to upload to root

    const { pdf } = await printPDF(body)

    const fileId = await uploadFile(pdf, fileName, folderId)
    console.log("File uploaded successfully:", fileId)
    // console.log("Local File", outputPath)
    // send email and attach pdf
    const email = await sendEmail(body, pdf)
    // delete
    res.status(200).json({ message: "ok", fileId, data: body, email })
  } catch (error) {
    console.log("Error Creating PDF:", error)
    res.status(500).json({ error: "Error creating PDF" })
  }
}
