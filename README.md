# Nest API for Email Parsing with Mailparser

*Developer: Esteban Toro Aristizabal*

*Website: [Personal Portfolio](https://etoro-roan.vercel.app/)*

*Client company: [Designli Website](https://designli.co/)*




## Overview
This Nest API is built to efficiently parse emails using Mailparser. It boasts a Swagger-documented interface personalized to the Designli brand, offering endpoints for testing and parsing both EML file URLs and direct uploads.

---

## Features
- **Swift Parsing**: Effortlessly parse emails with Mailparser, handling various formats and structures.
- **Custom Swagger Documentation**: Enjoy a branded Swagger interface tailored to Designli's aesthetics.
- **Test Endpoints**: Access endpoints specifically designed to retrieve sample EML files for testing purposes.
- **Parser Endpoints**: Utilize endpoints to parse EML files either via URL or by directly uploading the file.

---

## Prerequisites
- **GET Request Module**: Ensure availability of a module with GET requests to use as a parameter for email URL parsing.
- **Accessibility**: For external URLs, guarantee EML file type and server accessibility for seamless parsing.

---

## Tools Utilized
- **Mailparser**: A robust tool adept at parsing emails into structured and understandable data.
- **GitHub Repository**: Store example JSON files and a TXT file containing the URL to JSON data for convenient testing. [GitHub Repository](https://github.com/softEsteban/testing-files/tree/main)

---

## EML Files Test Module
This module comprises various example EML files:
- `json-attached-email.em`: EML file featuring an attached JSON document.
- `json-url-body-email.eml`: EML file containing a URL within the body, redirecting to a JSON file.
- `json-sub-url-body-email.eml`: EML file with a URL in the body that redirects to a text URL, ultimately leading to the actual JSON file.

---

## Email Parsing Module
The Email Parsing Module excels at parsing emails, allowing handling by EML file URL or through `multipart/form-data` in Swagger. It adeptly manages three critical scenarios:
1) Parsing emails with an attached JSON file.
2) Extracting JSON from a direct URL within the parsed email.
3) Handling an external URL within the parsed email, pointing to a page text hosting the actual JSON file URL.

---
