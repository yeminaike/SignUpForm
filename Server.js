
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({
  origin: '*',
 
}));

// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['POST'],
// }));

app.use(express.json());




app.post('/submit-form',  async (req, res) => {

    console.log("received")
    
      const SCOPES = [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
      ];
  
      const auth = new GoogleAuth({
        keyFile: 'credentials.json', 
        scopes: SCOPES,
      });
  
      const sheets = google.sheets({ version: 'v4', auth });
      const spreadsheetId = process.env.SPREADSHEET_ID;
      console.log('Spreadsheet ID:', process.env.SPREADSHEET_ID);


      
      const sheetName = 'PracticeTest'; 
  
      const { FirstName, LastName, email, phone_number  } = req.body
      console.log(req.body, "uuuuu")
      
      console.log(FirstName, "yyyy")
      console.log(LastName, "sssss")
      console.log(email, "eeeeeeeeeeee");
      console.log(phone_number, "ppppppppp");
      // console.log(select_availability, "yyyy")
      // console.log(full_name, "rrrr")

     
      
       await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}`, 
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[FirstName, LastName, email, phone_number]],
        },
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Form submitted successfully',
      });
    }
  );








// app.get('/health', (req, res) => {
    
//     res.status(200).json({ message: 'Form submission successful!'});

    
// });


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});