const zlib = require('zlib')
const fs = require("fs")

const dutkyo = fs.readFileSync("project temp folder here/temp/project.json")
const dutjson = JSON.parse(dutkyo)
if(fs.existsSync("files")) {
  console.log("files 폴더를 지우고 다시 시도해주세요")
  process.exit()
} else {
  fs.mkdirSync("files")
}

for(let i = 0; i < dutjson.objects.length; i++) {
  fs.mkdirSync('files/' + dutjson.objects[i].name.replace(/(\n|\\|\/|:|\*|\?|"|<|>|\|)/g, ' ') + ' (' + dutjson.objects[i].id + ')')
  fs.writeFileSync('files/'+dutjson.objects[i].name.replace(/(\n|\\|\/|:|\*|\?|"|<|>|\|)/g, ' ') + ' (' + dutjson.objects[i].id + ')/scriptsrc.txt', JSON.stringify(dutjson.objects[i]))
  fs.writeFileSync('files/'+dutjson.objects[i].name.replace(/(\n|\\|\/|:|\*|\?|"|<|>|\|)/g, ' ') + ' (' + dutjson.objects[i].id + ')/src.json', JSON.stringify(dutjson.objects[i].script).slice(1, JSON.stringify(dutjson.objects[i].script).length-1).replace(/\\"/g, "\""))
}

let objects, src, script, codes, blank, bracket
blank = ""
bracket = []
objects = fs.readdirSync("files", "utf-8")
src = "files/" + objects[0] + "/"
script = JSON.parse(fs.readFileSync("files/" + objects[0] + "/src.json", "utf-8"))
for(let i=0; i<script.length; i++) {
  console.log(script[i])
  for(let j=0; j<script[i].length; j++) console.log(script[i][j])
}
codes = "const { entry } = require(\"dutkyo\");\n\n"

//for문 쓸 예정
codes += "entry." + script[0][0]["type"] + "(\"" + String.fromCharCode(Number(script[0][0]["params"][1])) + "\").then(() => {"
bracket.unshift("})")
let rarray = ["i","j","k","l"]
let rindex = -1
allcode = function(type) {
  codes += "\n"
  switch(type["type"]) {
    case "repeat_basic":
      bracket.unshift("}")
      rindex += 1
      codes += blank + "for(let " + rarray[rindex] + "=0; " + rarray[rindex] + "<" + script[0][1]["params"][0]["params"] + "; " + rarray[rindex] + "++) {"
      blank += "  "
      for(let j=0; j<type["statements"][0].length; j++) {
        allcode(type["statements"][0][j])
      }
      rindex -= 1
      blank = blank.slice(0, blank.length - 2)
      codes += "\n" + blank + bracket[0]
      bracket.shift()
      break

    case "move_direction":
      codes += blank + "entry.moveDirection(" + type["params"][0]["params"] + ")"
      break
    case "bounce_wall":
      codes += blank + "entry.bounceWall()"
      break
    case "move_x":
      codes += blank + "entry.moveX(" + type["params"][0]["params"] + ")"
      break
    case "move_y":
      codes += blank + "entry.moveY(" + type["params"][0]["params"] + ")"
      break
    case "move_xy_time":
      codes += blank + "entry.moveXyTime(" + type["params"][0]["params"] + ", " +  + type["params"][1]["params"] + ", " + type["params"][2]["params"] + ")"
      break
  }
}

blank += "  "
for(let j=1; j<script[0].length; j++) {
  allcode(script[0][j])
}
codes += "\n"
blank = blank.slice(0, blank.length - 2)
codes += bracket[0] + "\n" + "\n"
fs.writeFileSync(src + "script.js", codes)
console.log("변경했습니다.")
