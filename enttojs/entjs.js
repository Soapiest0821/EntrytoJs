const zlib = require('zlib')
const fs = require("fs")
console.log(fs.readdirSync("../enttojs").filter(a => a.endsWith(".ent"))[0])
fs.writeFileSync("../enttojs", zlib.inflateSync(fs.readFileSync(fs.readdirSync("../enttojs").filter(a => a.endsWith(".ent"))[0], "utf-8")))
//var output = zlib.inflate(fs.);

const dutkyo = fs.readFileSync("temp/project.json")
const dutjson = JSON.parse(dutkyo)
!fs.existsSync("entjs") && fs.mkdirSync("entjs")
// function code(e) {
//   fs.writeFileSync('entjs/code ' + new Date().getTime() + '.txt', JSON.stringify(e))
// }
// code(dutjson.objects)
for(let i = 0; i < dutjson.objects.length; i++) {
  fs.mkdirSync('entjs/' + dutjson.objects[i].name.replaceAll('\n', ' ').replaceAll('\\', ' ').replaceAll('\/', ' ').replaceAll(':', ' ').replaceAll('*', ' ').replaceAll('?', ' ').replaceAll('"', ' ').replaceAll('<', ' ').replaceAll('>', ' ').replaceAll('|', ' ') + ' (' + dutjson.objects[i].id + ')')
  fs.writeFileSync('entjs/'+dutjson.objects[i].name.replaceAll('\n', ' ').replaceAll('\\', ' ').replaceAll('\/', ' ').replaceAll(':', ' ').replaceAll('*', ' ').replaceAll('?', ' ').replaceAll('"', ' ').replaceAll('<', ' ').replaceAll('>', ' ').replaceAll('|', ' ') + ' (' + dutjson.objects[i].id + ')/scriptsrc.txt', JSON.stringify(dutjson.objects[i]))
  fs.writeFileSync('entjs/'+dutjson.objects[i].name.replaceAll('\n', ' ').replaceAll('\\', ' ').replaceAll('\/', ' ').replaceAll(':', ' ').replaceAll('*', ' ').replaceAll('?', ' ').replaceAll('"', ' ').replaceAll('<', ' ').replaceAll('>', ' ').replaceAll('|', ' ') + ' (' + dutjson.objects[i].id + ')/src.json', JSON.stringify(dutjson.objects[i].script).slice(1, JSON.stringify(dutjson.objects[i].script).length-1).replaceAll("\\\"", "\""))
}

let objects, src, script, codes, bracket
bracket = []
objects = fs.readdirSync("entjs", "utf-8")
src = "entjs/" + objects[0] + "/"
script = JSON.parse(fs.readFileSync("entjs/" + objects[0] + "/src.json", "utf-8"))
for(let i=0; i<script.length; i++) {
  console.log(script[i])
  for(let j=0; j<script[i].length; j++)
  console.log(script[i][j])
}
codes = "const { entry } = require(\"dutkyo\"); \n"
codes += "entry." + script[0][0]["type"] + ".then(() => {"
bracket.push("})")

codes += bracket[0]
fs.writeFileSync(src + "script.js", codes)