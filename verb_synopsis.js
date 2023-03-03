var form;
var person = document.getElementById("person");
var number = document.getElementById("number");
var verbSelect = document.getElementById("verbSelect");
//Gets values of dropdown inputs
function CheckVals() {
  var form = 0;
  switch (person.value) {
    case "firstPerson":
      if (number.value == "singular") {
        form = 0;
      } else {
        form = 3;
      }
      break;
    case "secondPerson":
      if (number.value == "singular") {
        form = 1;
      } else {
        form = 4;
      }
      break;
    case "thirdPerson":
      if (number.value == "singular") {
        form = 2;
      } else {
        form = 5;
      }
      break;
  }
  return form;
}
//this function is fun
function eachCombine(){
    const sum = []
    var sumLength = arguments[0].length
    var startingPlace = 0;
    if (Number.isInteger(arguments[0]) == true){
      sumLength = arguments[0];
      startingPlace = 1;
    }
    for (i = 0; i < sumLength; i++){
      sum[i] = "";
      for (j = startingPlace; j < arguments.length; j++){
        if (Array.isArray(arguments[j]) == false){
          let filler = arguments[j];
          if (arguments[j].slice(-1,arguments[j].length) == "/"){
            filler = "";
          }
          const plc = arguments[j];
          arguments[j] = Array(sumLength).fill(filler);
        }
        if (arguments[j].length == i + 1){
          //if the array is too short
          let filler = arguments[j][i];
          if (arguments[j][i].slice(-1,arguments[j][i].length) == "/"){
            arguments[j][i] = arguments[j][i].slice(0, -1);
            filler = "";
          }
          const plc = arguments[j];
          arguments[j] = plc.concat(Array(sumLength - plc.length).fill(filler));
        }
      sum[i] += arguments[j][i]; 
      }
    }
    return sum;
  }
//Creates the class Verb
class Verb {
  constructor(pp1, pp2, pp3, pp4, irr, dep, conj) {
    this.pp1 = pp1;
    this.pp2 = pp2;
    this.pp3 = pp3;
    this.pp4 = pp4;
    this.irr = irr;
    this.dep = dep;
    this.conj = conj;
  }
  //conjugates the verb to check answers
  conjugate(form) {
    //form -- 0: 1p sing, 1: 2p sing, 2: 3p sing, 3: 1p plur, 4: 2p plur, 5: 3p plur
    const presentEndings = ["","s", "t", "mus", "tis", "nt"];
    const perfectEndings = ["i","isti", "it", "imus", "istis", "erunt"];
    //^also conjugated eram^
    const passivePresentEndings = ["r","ris", "tur", "mur", "mini", "ntur"];
    //^combine with ba for imperfect^
    const passivePerfectEndings = ["sum","es", "est", "sumus", "estis", "sunt"];
    //^^conjugated sum es est..^^
    const subImperfectEndings = ["m", "s", "t", "mus", "tis", "nt"]
    //^pluperfet + isse
    const fourthPPplural = ["us", "us", "us", "i", "i", "i"]
    var presentVowels =[];
    var imperfectVowel;
    var passiveInfinitiveStem = this.pp2.slice(-3,-2) + "ri";
    var fakeInfinitive = this.pp2.slice(0,-1)
    const futurePerfectEndings = ["ero", "eris", "erit", "erimus", "eritis", "erint"]
    var futurePresentEndings;
    var passiveFuturePresentEndings;
    switch (this.conj) {
        case "1":
          presentVowels = ["","a"];
          imperfectVowel = "a";
          fakeInfinitive += "e";
          futurePresentEndings = ["abo","abi","abi","abi","abi","abu"];
          passiveFuturePresentEndings = ["abor","aberis","abitur","abimur","abimini","abuntur"];
          break;
        case "2":
          presentVowels = "";
          imperfectVowel = "";
          fakeInfinitive += "e";
          futurePresentEndings = ["bo","bi","bi","bi","bi","bu"]
          passiveFuturePresentEndings = ["bor","beris","bitur","bimur","bimini","buntur"]
          break;
        case "3":
          presentVowels = ["","i","i","i","i","u"];
          imperfectVowel = "e";
          passiveInfinitiveStem = "i";
          fakeInfinitive += "ere";
          futurePresentEndings = ["am","e"]
          passiveFuturePresentEndings = ["ar","eris","itur","imur","imini","untur"]
          break;
        case "3io":
          presentVowels = ["","","","","","u"];
          imperfectVowel = "e";
          passiveInfinitiveStem = "i";
          fakeInfinitive += "ere";
          futurePresentEndings = ["am","e"]
          passiveFuturePresentEndings = ["ar","eris","itur","imur","imini","untur"]
          break;
        case "4":
          presentVowels = ["","","","","","u"];
          imperfectVowel = "e";
          fakeInfinitive += "e";
          futurePresentEndings = ["am","e"]
          passiveFuturePresentEndings = ["ar","eris","itur","imur","imini","untur"]
          break;
    }
    if (this.dep == true) {

      const present = eachCombine(6,[this.pp1.slice(0,-1), this.pp1.slice(0,-2)], presentVowels, passivePresentEndings);

      const imperfect = eachCombine(6, this.pp1.slice(0,-2), imperfectVowel, "ba", passivePresentEndings);

      const perfect = eachCombine(6, this.pp3.slice(0,-2), fourthPPplural, " ", passivePerfectEndings);

      const pluperfect = eachCombine(6, this.pp3.slice(0,-2), fourthPPplural, " era", subImperfectEndings);

      const futurePresent = eachCombine(6, this.pp1.slice(0,-2), passiveFuturePresentEndings);

      const futurePerfect = eachCombine(6, this.pp3.slice(0,-2), fourthPPplural, " ", futurePerfectEndings);

      //const subPresent
      
      const subImperfect = eachCombine(fakeInfinitive, subImperfectEndings)

      //const subPerfect

      const subPluperfect = eachCombine(6, this.pp3.slice(0, -2),  fourthPPplural, " esse", subImperfectEndings)

      const presentActiveParticiple = this.pp1.slice(0,-2) + imperfectVowel + "ns, -" + (this.pp1.slice(0,-2) + imperfectVowel).slice(-1) + "ntis";

      const perfectActiveParticiple = this.pp3 + ", -a, -um";

      const perfectPassiveParticiple = "";
      
      const futureActiveParticiple = this.pp3.slice(0,-2) + "urus, -a, -um";

      const presentActiveInfinitive = this.pp2;

      //sets and returns the fully conjugated verb
      var conjugations = [present[form], imperfect[form], perfect[form], pluperfect[form], futurePresent[form], futurePerfect[form], "", "", "", "", "", "", ""/*subPresent[form]*/, subImperfect[form], ""/*subPerfect[form]*/, subPluperfect[form], "", "", /*impPositive*/"", /*impPositivePlural*/"", /*impNegative*/"", /*impNegativePlural*/"", presentActiveParticiple, perfectActiveParticiple,"", futureActiveParticiple,"", presentActiveInfinitive, ""];



    } else {
      const present = eachCombine(6,[this.pp1, this.pp1.slice(0,-1)], presentVowels, presentEndings);

      const imperfect = eachCombine(6, this.pp1.slice(0,-1), imperfectVowel, "ba", subImperfectEndings);

      const perfect = eachCombine(6, this.pp3.slice(0,-1), perfectEndings);

      const pluperfect = eachCombine(6, this.pp3.slice(0,-1),  "era", subImperfectEndings);

      const futurePresent = eachCombine(6, this.pp1.slice(0,-1), futurePresentEndings, presentEndings);

      const futurePerfect = eachCombine(6,this.pp3.slice(0,-1), futurePerfectEndings);

      const passivePresent = eachCombine(6,[this.pp1, this.pp1.slice(0,-1)], presentVowels, passivePresentEndings);

      const passiveImperfect = eachCombine(6, this.pp1.slice(0,-1), imperfectVowel, "ba", passivePresentEndings);

      const passivePerfect = eachCombine(6, this.pp4.slice(0,-2), fourthPPplural, " ", passivePerfectEndings);

      const passivePluperfect = eachCombine(6, this.pp4.slice(0,-2), fourthPPplural, " era", subImperfectEndings);

      const passiveFuturePresent = eachCombine(6, this.pp1.slice(0,-1), passiveFuturePresentEndings);

      const passiveFuturePerfect = eachCombine(6, this.pp4.slice(0,-2), fourthPPplural, " ", futurePerfectEndings);

      // const subPresent =

      const subImperfect = eachCombine(6, this.pp2, subImperfectEndings);

      // const subPerfect

      const subPluperfect = eachCombine(6, this.pp3, "sse", subImperfectEndings);

      // const subPassivePresent = 

      const subPassiveImperfect = eachCombine(6, this.pp2, passivePresentEndings);

      // const subPassivePerfect = 

      const subPassivePluperfect = eachCombine(6, this.pp4.slice(0,-2), fourthPPplural, " esse", subImperfectEndings);

      const impPositive = this.pp2.slice(0, -2);

      const impNegative = "noli " + this.pp2;

      const impPositivePlural = this.pp2.slice(0,-2) + "te";

      const impNegativePlural = "nolite " + this.pp2;

      const presentActiveParticiple = this.pp1.slice(0,-1) + imperfectVowel + "ns, -" + (this.pp1.slice(0,-1) + imperfectVowel).slice(-1) + "ntis";

      const perfectActiveParticiple = "";

      const perfectPassiveParticiple = this.pp4 + ", -a, -um";
      
      const passiveFutureParticiple = this.pp4.slice(0,-2) + "urus, -a, -um";

      const futureActiveParticiple = this.pp1.slice(0,-1) + imperfectVowel + "ndus, -a, -um";

      const presentActiveInfinitive = this.pp2;

      const presentPassiveInfinitive = this.pp2.slice(0,-3) + passiveInfinitiveStem;

      //sets and returns the fully conjugated verb
      var conjugations = [present[form], imperfect[form], perfect[form], pluperfect[form], futurePresent[form], futurePerfect[form], passivePresent[form], passiveImperfect[form], passivePerfect[form], passivePluperfect[form], passiveFuturePresent[form], passiveFuturePerfect[form], ""/*subPresent[form]*/, subImperfect[form], ""/*subPerfect[form]*/, subPluperfect[form], ""/*subPassivePresent[form]*/, subPassiveImperfect[form], ""/*subPassivePerfect[form]*/, subPassivePluperfect[form], impPositive,impPositivePlural, impNegative, impNegativePlural, presentActiveParticiple,perfectActiveParticiple, perfectPassiveParticiple, passiveFutureParticiple, futureActiveParticiple, presentActiveInfinitive, presentPassiveInfinitive];
      console.log(passiveFuturePerfect);
    }
    return conjugations;
  }
}

//all the text box inputs from the html
const inputs = [document.getElementById("present"), document.getElementById("imperfect"), document.getElementById("perfect"), document.getElementById("pluperfect"), document.getElementById("futurePresent"), document.getElementById("futurePerfect"), document.getElementById("passivePresent"), document.getElementById("passiveImperfect"), document.getElementById("passivePerfect"), document.getElementById("passivePluperfect"), document.getElementById("passiveFuturePresent"), document.getElementById("passiveFuturePerfect"), document.getElementById("subPresent"), document.getElementById("subImperfect"), document.getElementById("subPerfect"), document.getElementById("subPluperfect"), document.getElementById("subPassivePresent"), document.getElementById("subPassiveImperfect"), document.getElementById("subPassivePerfect"), document.getElementById("subPassivePluperfect"), document.getElementById("impPositive"), document.getElementById("impNegative"), document.getElementById("impPositivePlural"), document.getElementById("impNegativePlural"), document.getElementById("presentActiveParticiple"),document.getElementById("perfectActiveParticiple"), document.getElementById("perfectPassiveParticiple"), document.getElementById("futureActiveParticiple"), document.getElementById("passiveFutureParticiple"), document.getElementById("presentActiveInfinitive"), document.getElementById("presentPassiveInfinitive")];
//all the currently invisible outputs (answers) from the html
const outputs = [document.getElementById("presentAnswer"), document.getElementById("imperfectAnswer"), document.getElementById("perfectAnswer"), document.getElementById("pluperfectAnswer"), document.getElementById("futurePresentAnswer"), document.getElementById("futurePerfectAnswer"), document.getElementById("passivePresentAnswer"), document.getElementById("passiveImperfectAnswer"), document.getElementById("passivePerfectAnswer"), document.getElementById("passivePluperfectAnswer"), document.getElementById("passiveFuturePresentAnswer"), document.getElementById("passiveFuturePerfectAnswer"), document.getElementById("subPresentAnswer"), document.getElementById("subImperfectAnswer"), document.getElementById("subPerfectAnswer"), document.getElementById("subPluperfectAnswer"), document.getElementById("subPassivePresentAnswer"), 
document.getElementById("subPassiveImperfectAnswer"), document.getElementById("subPassivePerfectAnswer"), document.getElementById("subPassivePluperfectAnswer"), document.getElementById("impPositiveAnswer"), document.getElementById("impNegativeAnswer"), document.getElementById("impPositivePluralAnswer"), document.getElementById("impNegativePluralAnswer"), document.getElementById("presentActiveParticipleAnswer"), document.getElementById("perfectActiveParticipleAnswer"), document.getElementById("perfectPassiveParticipleAnswer"), document.getElementById("futureActiveParticipleAnswer"), document.getElementById("passiveFutureParticipleAnswer"), document.getElementById("presentActiveInfinitiveAnswer"), document.getElementById("presentPassiveInfinitiveAnswer")];

//resets the inputs, makes the outputs invisible again
function ResetVals() {
  for (k = 0; k < outputs.length; k++) {
    outputs[k].innerHTML = "";
    inputs[k].value = "";
  }
  document.getElementById("numCorrect").innerHTML = "";
  UpdateForm();
}

function ToBlank() {
  for (var i = 0; i < arguments.length; i++){
    document.getElementById(arguments[i]).className = "blank";
    document.getElementById(arguments[i]).disabled = true;
    document.getElementById(arguments[i]).value = "";
  }
}
function ToUnBlank() {
  for (var i = 0; i < arguments.length; i++){
    document.getElementById(arguments[i]).classList.remove("blank");
    document.getElementById(arguments[i]).disabled = false;
    document.getElementById(arguments[i]).value = "";
  }
}

function UpdateForm() {
  if (verbs[verbSelect.value].dep == true) {
    ToBlank("passivePresent", "passiveImperfect", "passivePerfect", "passivePluperfect", "subPassivePresent", "subPassiveImperfect", "subPassivePerfect", "subPassivePluperfect", "passiveFuturePresent", "passiveFuturePerfect", "impPositive", "impNegative", "impPositivePlural", "impNegativePlural", "perfectPassiveParticiple","passiveFutureParticiple","presentPassiveInfinitive");
    ToUnBlank("perfectActiveParticiple")
  } else {
    ToBlank("perfectActiveParticiple");
    ToUnBlank("passivePresent", "passiveImperfect", "passivePerfect", "passivePluperfect", "futurePresent", "futurePerfect", "passiveFuturePresent", "passiveFuturePerfect", "subPassivePresent", "subPassiveImperfect", "subPassivePerfect", "subPassivePluperfect", "passiveFutureParticiple","presentPassiveInfinitive", "impPositive", "impNegative", "impPositivePlural", "impNegativePlural", "perfectPassiveParticiple");
  }
}
window.onload = UpdateForm;

//checks and displays the answers in red or green
function CheckAnswer() {
  let verbForm = CheckVals();
  let chosenVerb = verbs[document.getElementById("verbSelect").value];
  const conjugatedVerb = chosenVerb.conjugate(verbForm);
  console.log(conjugatedVerb);
  let numCorrect = 0;

  for (j = 0; j < conjugatedVerb.length; j++) {
    outputs[j].innerHTML = conjugatedVerb[j];
    if (inputs[j].value == conjugatedVerb[j] & inputs[j].value != ""){
      outputs[j].style = "color: green;";
    } else {
      outputs[j].style = "color: red;";
    }
  }
  let maxScore = "25";
  if (chosenVerb.dep == true){
    maxScore = "7"
  };
  document.getElementById("numCorrect").innerHTML = numCorrect+"/"+maxScore;
  numCorrect = 0;
  console.log(verbs[27])
}

//a good selection of verbs

const verbs = [];
//30
verbs[0] = new Verb("afficio", "afficere", "affeci", "affectus", false, false, "3io");
verbs[1] = new Verb("consulo", "consulere", "consului", "consultus", false, false, "3");
verbs[2] = new Verb("creo", "creare", "creavi", "creatus", false, false, "1");
verbs[3] = new Verb("demitto", "demittere", "demisi", "demissus", false, false, "3");
verbs[4] = new Verb("extruo", "extruere", "extruxi", "extructus", false, false, "3");
verbs[5] = new Verb("praesto", "praestare", "praestiti", "praestitus", false, false, "1");
//29
verbs[6] = new Verb("circumvenio", "circumvenire", "circumveni", "circumventus", false, false, "4")
verbs[7] = new Verb("perficio", "perficere", "perfeci", "perfectus", false, false, "3io")
verbs[8] = new Verb("reduco", "reducere", "reduxi", "reductus", false, false, "3")
verbs[9] = new Verb("sperno", "spernere", "sprevi", "spretus", false, false, "3")
//28
verbs[10] = new Verb("augeo", "augere", "auxi", "auctus", false, false, "2")
verbs[11] = new Verb("constituto", "constitutere", "constitutui", "constitutus", false, false, "3")
verbs[12] = new Verb("diligo", "diligere", "dilexi", "dilectus", false, false, "3")
verbs[13] = new Verb("mando", "mandare", "mandavi", "mandatus", false, false, "1")
verbs[14] = new Verb("occido", "occidere", "occidi", "occisus", false, false, "3")
verbs[15] = new Verb("praeficio", "praeficere", "praefeci", "praefectus", false, false, "3io")
verbs[16] = new Verb("solvo", "solvere", "soluti", "solutus", false, false, "3")
//27
verbs[17] = new Verb("incendo", "incendere", "incendi", "incensus", false, false, "3")
//26
verbs[18] = new Verb("accuso", "accusare", "accusavi", "accusatus", false, false, "1")
verbs[19] = new Verb("colligo", "colligere", "collegi", "collectus", false, false, "3")
verbs[20] = new Verb("doceo", "docere", "docui", "doctus", false, false, "2")
//31
verbs[21] = new Verb("neglego", "neglegere", "neglexi", "neglectus", false, false, "3")
verbs[22] = new Verb("reficio", "reficere", "refeci", "refectus", false, false, "3io")
verbs[23] = new Verb("seco", "secare", "secui", "sectus", false, false, "1")
//does #23 work?
verbs[24] = new Verb("veho", "vehere", "vexi", "vectus", false, false, "3")
verbs[25] = new Verb("vincio", "vincire", "vinxi", "vinctus", false, false, "4")
verbs[26] = new Verb("volvo", "volvere", "volvi", "volutus", false, false, "3")
verbs[27] = new Verb("conor", "conari", "conatus", " ", false, true, "1")
verbs[28] = new Verb("ingredior", "ingredi", "ingressus", " ", false, true, "3io")
//some irregulars
//verbs[29] = new Verb("sum", "esse", "fui", " ", true, false)
//console.log(verbs[29].conjugate(1))
//alphabetizes the verbs
verbs.sort(function (a, b) {
  let x = a.pp1.toLowerCase();
  let y = b.pp1.toLowerCase();
  if (x < y) { return -1; }
  if (x > y) { return 1; }
  return 0;
});

//creates an option in the verbSelect dropdown for every verb
for (i = 0; i < verbs.length; i++) {
  var newVerb = document.createElement("OPTION");
  var isDep = "";
  var isIrr = "";
  if (verbs[i].dep == true) {
    isDep = " **DEPONENT**";
  };
  if (verbs[i].irr == true) {
    isIrr = "**IRREGULAR**";
  };
  verbText = document.createTextNode(/*(i + 1).toString() + ". "+*/ verbs[i].pp1 + ", " + verbs[i].pp2 + ", " + verbs[i].pp3 + ", " + verbs[i].pp4 + isDep + isIrr);
  newVerb.appendChild(verbText);
  newVerb.value = i;
  verbSelect.appendChild(newVerb);
}

//checks whether checkboxes (html) are checked and randomizes if they are
function getRandom() {
  if (document.getElementById("verbBox").checked == true) {
    verbNum = Math.floor(Math.random() * verbs.length);
    console.log(verbNum);
    document.getElementById("verbSelect").options.selectedIndex = verbNum;
  }
  if (document.getElementById("personBox").checked == true) {
    personNum = Math.floor(Math.random() * 3);
    console.log(personNum);
    document.getElementById("person").options.selectedIndex = personNum;
  }
  if (document.getElementById("numberBox").checked == true) {
    numberNum = Math.floor(Math.random() * 2);
    console.log(numberNum);
    document.getElementById("number").options.selectedIndex = numberNum;
  }
}


/*lass Theme {
  constructor(name, bgColor, buttonColor, inputColor, borderColor, inputTextColor, textColor, )
}

const themes[];

//themes!
function SetTheme(theme){
  if theme
}*/