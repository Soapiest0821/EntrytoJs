const zlib = require('zlib')
const fs = require("fs")
// console.log(fs.readdirSync("../EntrytoJs").filter(a => a.endsWith(".ent"))[0])
// fs.writeFileSync("../EntrytoJs", zlib.inflateSync(fs.readFileSync(fs.readdirSync("../EntrytoJs").filter(a => a.endsWith(".ent"))[0], "utf-8")))
//var output = zlib.inflate(fs.);

const dutkyo = fs.readFileSync("temp/project.json")
const dutjson = JSON.parse(dutkyo)
if(fs.existsSync("entjs")) {
  console.log("entjs 폴더를 지우고 다시 시도해주세요")
  process.exit()
} else {
  fs.mkdirSync("entjs")
}
// function code(e) {
//   fs.writeFileSync('entjs/code ' + new Date().getTime() + '.txt', JSON.stringify(e))
// }
// code(dutjson.objects)
for(let i = 0; i < dutjson.objects.length; i++) {
  fs.mkdirSync('entjs/' + dutjson.objects[i].name
  .replace(/\n/g, ' ')
  .replace(/\\/g, ' ')
  .replace(/\//g, ' ')
  .replace(/:/g, ' ')
  .replace(/\*/g, ' ')
  .replace(/\?/g, ' ')
  .replace(/"/g, ' ')
  .replace(/</g, ' ')
  .replace(/>/g, ' ')
  .replace(/\|/g, ' ') + ' (' + dutjson.objects[i].id + ')')
  fs.writeFileSync('entjs/'+dutjson.objects[i].name
  .replace(/\n/g, ' ')
  .replace(/\\/g, ' ')
  .replace(/\//g, ' ')
  .replace(/:/g, ' ')
  .replace(/\*/g, ' ')
  .replace(/\?/g, ' ')
  .replace(/"/g, ' ')
  .replace(/</g, ' ')
  .replace(/>/g, ' ')
  .replace(/\|/g, ' ') + ' (' + dutjson.objects[i].id + ')/scriptsrc.txt', JSON.stringify(dutjson.objects[i]))
  fs.writeFileSync('entjs/'+dutjson.objects[i].name
  .replace(/\n/g, ' ')
  .replace(/\\/g, ' ')
  .replace(/\//g, ' ')
  .replace(/:/g, ' ')
  .replace(/\*/g, ' ')
  .replace(/\?/g, ' ')
  .replace(/"/g, ' ')
  .replace(/</g, ' ')
  .replace(/>/g, ' ')
  .replace(/\|/g, ' ') + ' (' + dutjson.objects[i].id + ')/src.json', JSON.stringify(dutjson.objects[i].script).slice(1, JSON.stringify(dutjson.objects[i].script).length-1).replace(/\\"/g, "\""))
}

let objects, src, script, codes, blank, bracket
blank = ""
bracket = []
objects = fs.readdirSync("entjs", "utf-8")
src = "entjs/" + objects[0] + "/"
script = JSON.parse(fs.readFileSync("entjs/" + objects[0] + "/src.json", "utf-8"))
for(let i=0; i<script.length; i++) {
  console.log(script[i])
  for(let j=0; j<script[i].length; j++) console.log(script[i][j])
}
codes = "const { entry } = require(\"dutkyo\");\n\n"

//for문 쓸 예정
codes += "entry." + script[0][0]["type"] + "().then(() => {"
bracket.unshift("})")

allcode = function(type) {
  blank += "  "
  codes += "\n"
  switch(type["type"]) {
    case "repeat_basic":
      //blank += "  "
      bracket.unshift("}")
      codes += blank + "for(let i=0; i<" + script[0][1]["params"][0]["params"] + "; i++) {"
      allcode(type["statements"][0][0])
      blank = blank.slice(0, blank.length - 2)
      codes += "\n" + blank + bracket[0]
      bracket.shift()
      break

    case "move_direction":
      codes += blank + "entry.moveDirection(" + type["params"][0]["params"] + ")"
      break
  }
}

allcode(script[0][1])
codes += "\n"
blank = blank.slice(0, blank.length - 2)
codes += bracket[0] + "\n" + "\n"
fs.writeFileSync(src + "script.js", codes)