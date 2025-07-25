import { url } from '../models/Url.js';
import shortId from 'shortid';
import QRCode from 'qrcode';
export const shortUrl = async (req, res)=>{
    const longUrl = req.body.longUrl;
    const shortCode = shortId.generate();

    const shortUrl = `http://localhost:1000/${shortCode}`;


    //save to database
    const newUrl = new url({shortCode, longUrl})
    await newUrl.save()
     
    // Generate QR code image as Data URL
    const qrCodeDataUrl = await QRCode.toDataURL(shortUrl);

    console.log("short saved", newUrl );
    res.render('index.ejs', {shortUrl : shortUrl,  qrCode: qrCodeDataUrl})
}

export const getoriginalUrl = async (req, res)=>{
    const shortCode = req.params.shortCode
    //find the db
    const originalUrl = await url.findOne({shortCode})
    if(originalUrl){
        res.redirect(originalUrl.longUrl)
    }else{
        res.json({message:"invalid short code"})
    }
}