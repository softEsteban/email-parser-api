import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { createReadStream } from 'fs';
import { simpleParser } from 'mailparser';
import { Readable } from 'stream';

@Injectable()
export class EmailParserService {

  /**
   * *
   * 
   * @param {*} parsedEmail 
   * @returns 
   * 
   * @memberOf EmailParserService
   */
  async proccessParsedData(parsedEmail: any) {
    // Accessing attachment json file in email
    try {
      if (parsedEmail.attachments && parsedEmail.attachments.length > 0) {

        const firstAttachment = parsedEmail.attachments[0];

        if (Buffer.isBuffer(firstAttachment.content)) {
          try {
            const jsonContent = JSON.parse(firstAttachment.content.toString());
            return jsonContent;
          } catch (error) {
            console.error('Error parsing JSON content:', error);
          }
        } else {
          console.error('No valid attachment content found.');
        }
      } else {
        console.error('No attachments found in the email.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    // Accessing json file in direct url to json or sub url to the actual url
    try {
      const urlRegex = /<a[^>]+href="([^"]+)"/;
      const match = parsedEmail.html.match(urlRegex);

      if (match && match[1]) {
        const url = match[1];
        const urlData = await axios.get(url);

        try {
          // Attempt to parse the fetched data as JSON
          const jsonData = JSON.parse(JSON.stringify(urlData.data));
          if (typeof jsonData === 'object' && jsonData !== null) {
            return jsonData;
          } else {
            try {
              const response = await axios.get(urlData.data);
              return response.data;
            } catch (urlError) {
              console.error('Error fetching content from URL:', urlError);
            }
          }
        } catch (jsonError) {

          // If parsing as JSON failed, treat the data as a potential URL
          try {
            const response = await axios.get(urlData.data);
            return response.data;
          } catch (urlError) {
            console.error('Error fetching content from URL:', urlError);
          }
        }
      } else {
        console.log('No URL found in the HTML content.');
      }
    } catch (error) {
      console.error('Error occurred while fetching or parsing data:', error);
    }

    return { "message": "There was not JSON file attached in email, body url or body sub url" };

  }

  async parseEmailFromUrl(url: string): Promise<any> {
    try {

      const response = await axios.get<Readable>(url, { responseType: 'stream' });
      const parsedEmail = await simpleParser(response.data);

      return this.proccessParsedData(parsedEmail);

    } catch (error) {
      throw new Error('Error parsing email: ' + error.message);
    }
  }

  async parseEmailFromFile(path: string): Promise<any> {
    try {
      const fileStream = createReadStream(path);
      const parsedEmail = await simpleParser(fileStream);

      return this.proccessParsedData(parsedEmail);

    } catch (error) {
      throw new Error('Error parsing email: ' + error.message);
    }
  }
}
