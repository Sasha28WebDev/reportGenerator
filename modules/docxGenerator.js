const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");


exports.docxtemplater = function ( req) {
  // Load the docx file as binary content

  console.log(req.body);
  date1 = req.body.userBirthday
  const content = fs.readFileSync(
    path.resolve(__dirname, "../static/input.docx"),
    "binary"
  );

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });
/*
  // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
  doc.render({
    first: "John",
    last: "Doe",
    phone: "0652455478",
    description: "New Website",
  });
*/

  doc.render({
    dateFrom : req.body.dateFrom,
    dateTo : req.body.dateTo

  }
  )

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });

  // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
  let fileName = path.resolve(__dirname, "../result/output.docx")
  fs.writeFileSync(fileName, buf);
  return (fileName)
  //res.download(path.join(__dirname, "./output.docx"),(err)=>{console.log(err)})
 

 // res.send("файл сгенерирован!");

};
