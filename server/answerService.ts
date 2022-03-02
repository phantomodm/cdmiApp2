const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
import { Request, Response } from 'express';
import { xmlToJson } from './utilities/xml2json';

export interface Message {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

interface Gmail {
  id: string;
  threadId: string;
}

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
export function getEmail(request: Request, response: Response) {
  let allEmails:any = [];
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), listMessages);
  });
  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    console.log(credentials);
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    function getNewToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return console.error('Error retrieving access token', err);
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
          });
          callback(oAuth2Client);
        });
      });
    }
  }
  function listMessages(auth, query) {
    query = 'messages@atozmsg.com';
    const allMail = [];
    return new Promise((resolve, reject) => {
      const gmail = google.gmail({ version: 'v1', auth });
      gmail.users.messages
        .list({
          userId: 'office@cdmionline.com',
          q: query,
          maxResults: 100,
        })
        .then((m: any) => {
          let messages = [];
          messages = m.data.messages.map((n:any) => {
            gmail.users.messages
              .get({
                userId: 'office@cdmionline.com',
                id: n.id,
              })
              .then((a:any) => {
                console.log(a.headers.date);
                var body = a.data.payload.body.data;
                const buff = Buffer.from(body, 'base64');
                var htmlBody = buff.toString('utf-8');

                var tempString = '';
                var spaceAdded = false;
                var validate = /[A-Za-z0-9]/i;
                [...htmlBody].forEach((l) => {
                  if (validate.test(l)) {
                    spaceAdded = false;
                    tempString += l;
                  } else if (spaceAdded && l === ' ') {

                  } else if (l === ' ') {
                    tempString += l;
                    spaceAdded = true;
                  }
                });

                if (/EMAIL/.test(a)) {
                  console.log('email exists')
                  allEmails.push({
                    date: a.headers.date,
                    name: tempString
                      .substring(
                        tempString.indexOf('NAME') + 4,
                        tempString.indexOf('PHONE')
                      )
                      .trim(),
                    phone: tempString
                      .substring(
                        tempString.indexOf('PHONE') + 5,
                        tempString.indexOf('EMAIL')
                      )
                      .trim(),
                    email: tempString
                      .substring(
                        tempString.indexOf('EMAIL') + 5,
                        tempString.indexOf('MESSAGE')
                      )
                      .trim(),
                    message: tempString.slice(
                      tempString.indexOf('MESSAGE') + 7
                    ),
                  });

                  if (allEmails.length == messages.length) {
                    //console.log(allEmails);
                    response.status(200).send(allEmails);
                  }
                } else {
                  allEmails.push({
                    date:a.headers.date,
                    name: tempString
                      .substring(
                        tempString.indexOf('NAME') + 4,
                        tempString.indexOf('PHONE')
                      )
                      .trim(),
                    phone: (/EMAIL/.test(tempString)) ? tempString
                    .substring(
                      tempString.indexOf('PHONE') + 5,
                      tempString.indexOf('EMAIL')
                    )
                    .trim() : tempString
                      .substring(
                        tempString.indexOf('PHONE') + 5,
                        tempString.indexOf('MESSAGE')
                      )
                      .trim(),
                    email: (/EMAIL/.test(tempString)) ? tempString
                    .substring(
                      tempString.indexOf('EMAIL') + 5,
                      tempString.indexOf('MESSAGE')
                    )
                    .trim() : null,
                    message: tempString.slice(
                      tempString.indexOf('MESSAGE') + 7
                    ).trim(),
                  });

                  if (allEmails.length == messages.length) {
                    //console.log(allEmails);
                    response.status(200).send(allEmails);
                  }
                }
              });
          });
        });
    });
  }
}
