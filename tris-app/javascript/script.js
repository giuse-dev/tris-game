// to do
// 1)cambiare di colore le righe/colonne/diagonali quando si vince

let tabella; //una matrice 3x3 che tiene conto delle caselle libere/occupate dall'utente/computer
let tabellaAttiva = false; //booleano che indica se l'utente può cliccare sulla tabella.
let partitaConclusa = false; //booleano che indica se in un dato momento la partita è conclusa.

let vittorieUtente = 0;
let vittorieComputer = 0;
let pareggi = 0;

let numeroTurno = 0; //indica il numero di turni che sono stati giocati

const messaggio1 = "Scegli il tuo simbolo, chi inizia e clicca su Nuova Partita!";
const messaggio2 = "Tocca a te";

let Giocatore = function(simbolo){
  this.simbolo = simbolo;
  this.muovePerPrimo = false;
}

let utente; //contiene il giocatore utente
let computer; //contiene il giocatore computer

function giocaNuovaPartita(){
  resettaAnimazioni();
  pulisciGraficaTabella();
  numeroTurno = 0;
  document.getElementById("start-button").disabled = true;

  //creo la matrice e la riempio
  tabella = new Array();
  for(let i = 0; i < 3; i++){
    tabella[i] = new Array('a', 'a', 'a');
  }

  if(document.getElementById("x-symbol-id").checked){
    utente = new Giocatore("x");
    computer = new Giocatore("o");
  }else{
    utente = new Giocatore("o");
    computer = new Giocatore("x");
  }

  if(document.getElementById("user-start-id").checked){ utente.muovePerPrimo = true; }
  else{ computer.muovePerPrimo = true; }

  disabilitaRadioButtons();
  aggiornaMessaggio(messaggio2);
  tabellaAttiva = true;
  partitaConclusa = false;

  if(computer.muovePerPrimo) { computerMuove(); }
}

function aggiornaMessaggio(mess){
  document.getElementById("message-id").innerHTML = mess;
}

function pulisciGraficaTabella(){
  let parent = document.getElementById("img-div");

  for(let i = 0; i< numeroTurno; i++){
    parent.removeChild(parent.lastChild);
  }

}

//@param int,int la posizione della tabella in cui l'utente ha inserito il simbolo
function utenteMuove(indiceR, indiceC){
  if(!tabellaAttiva) {
    alert("devo cliccare su Nuova Partita pirma di poter giocare");
  }else if(tabella[indiceR][indiceC] === 'a'){ //se la posizione è libera
    aggiornaGraficaTabella(indiceR, indiceC, utente.simbolo);
    tabella[indiceR][indiceC] = utente.simbolo;
    numeroTurno ++;
    controllaEsito(utente.simbolo);
    if(!partitaConclusa){ computerMuove(); }
  }

}


function computerMuove(){

  let deveMuovere = true;
  while(deveMuovere){
    let indiceR = Math.floor( Math.random()*3 ); //restituisce un numero random tra 0 e 2
    let indiceC = Math.floor( Math.random()*3 ); //restituisce un numero random tra 0 e 2

    if(tabella[indiceR][indiceC] === 'a'){
      aggiornaGraficaTabella(indiceR, indiceC, computer.simbolo);
      tabella[indiceR][indiceC] = computer.simbolo;
      numeroTurno++;
      deveMuovere = false;
      controllaEsito(computer.simbolo);
    }

  }

}


//controlla se qualcuno ha vinto o se c'è un pareggio
//@param simbolo = simbolo dell ultimo giocatore che ha mosso
function controllaEsito(simbolo){

  if( tabella[0][0] === tabella[0][1] && tabella[0][1] === tabella[0][2] && tabella[0][2] === simbolo){
    //se la prima riga ha tutti i simboli uguali
    if(utente.simbolo === simbolo){ aggiornaTabellone('vittoria'); }
    else{ aggiornaTabellone('sconfitta'); }
  }else if( tabella[1][0] === tabella[1][1] && tabella[1][1] === tabella[1][2] && tabella[1][2] === simbolo){
    //altrimenti se la seconda riga ha tutti i simboli uguali
    if(utente.simbolo === simbolo){ aggiornaTabellone('vittoria'); }
    else{ aggiornaTabellone('sconfitta'); }
  }else if( tabella[2][0] === tabella[2][1] && tabella[2][1] === tabella[2][2] && tabella[2][2] === simbolo){
    //altrimenti se la terza riga ha tutti i simboli uguali
    if(utente.simbolo === simbolo){ aggiornaTabellone('vittoria'); }
    else{ aggiornaTabellone('sconfitta'); }
  }else if( tabella[0][0] === tabella[1][0] && tabella[1][0] === tabella[2][0] && tabella[2][0] === simbolo){
    //se la prima colonna ha tutti i simboli uguali
    if(utente.simbolo === simbolo){ aggiornaTabellone('vittoria'); }
    else{ aggiornaTabellone('sconfitta'); }
  }else if( tabella[0][1] === tabella[1][1] && tabella[1][1] === tabella[2][1] && tabella[2][1] === simbolo){
    //altrimenti se la seconda colonna ha tutti i simboli uguali
    if(utente.simbolo === simbolo){ aggiornaTabellone('vittoria'); }
    else{ aggiornaTabellone('sconfitta'); }
  }else if( tabella[0][2] === tabella[1][2] && tabella[1][2] === tabella[2][2] && tabella[2][2] === simbolo){
    //altrimenti se la terza colonna ha tutti i simboli uguali
    if(utente.simbolo === simbolo){ aggiornaTabellone('vittoria'); }
    else{ aggiornaTabellone('sconfitta'); }
  }else if( tabella[0][0] === tabella[1][1] && tabella[1][1] === tabella[2][2] && tabella[2][2] === simbolo){
    //altrimenti se la prima diagonale ha tutti i simboli uguali
    if(utente.simbolo === simbolo){ aggiornaTabellone('vittoria'); }
    else{ aggiornaTabellone('sconfitta'); }
  }
  else if( tabella[0][2] === tabella[1][1] && tabella[1][1] === tabella[2][0] && tabella[2][0] === simbolo){
    //altrimenti se la seconda diagonale ha tutti i simboli uguali
    if(utente.simbolo === simbolo){ aggiornaTabellone('vittoria'); }
    else{ aggiornaTabellone('sconfitta'); }
  }else if(numeroTurno === 9){ //se non ci sono tris e sono stati inseriti 9 simboli, allora è pareggio
    aggiornaTabellone("Pareggio");
  }

}

function aggiornaTabellone(risultato){
  if(risultato === "vittoria") {
    vittorieUtente++;
    document.getElementById("wins-id").innerHTML = vittorieUtente;

  }else if(risultato === "sconfitta") {
    vittorieComputer++;
    document.getElementById("losses-id").innerHTML = vittorieComputer;

  }else {
    pareggi++;
    document.getElementById("draws-id").innerHTML = pareggi;
  }

  animaRisultato(risultato);
  tabellaAttiva = false;
  partitaConclusa = true;
  abilitaRadioButtons();
  document.getElementById("start-button").disabled = false;
  aggiornaMessaggio(messaggio1);
}

function animaRisultato(risultato){
  let bersaglio;
  if(risultato === 'vittoria'){ bersaglio = document.getElementById('div-wins'); }
  else if(risultato === 'sconfitta'){ bersaglio = document.getElementById('div-losses'); }
  else{ bersaglio = document.getElementById('div-draws'); }
  bersaglio.style.animationName = 'ingrandisciTesto';
  bersaglio.style.animationDuration = '3s';
}

function disabilitaRadioButtons(){
  document.getElementById("user-start-id").disabled = true;
  document.getElementById("comp-start-id").disabled = true;
  document.getElementById("x-symbol-id").disabled = true;
  document.getElementById("o-symbol-id").disabled = true;
}

function abilitaRadioButtons(){
  document.getElementById("user-start-id").disabled = false;
  document.getElementById("comp-start-id").disabled = false;
  document.getElementById("x-symbol-id").disabled = false;
  document.getElementById("o-symbol-id").disabled = false;
}

function aggiornaGraficaTabella(indiceR, indiceC, simbolo){

  let imgTag = creaImgTag(simbolo);
  let parent = document.getElementById("img-div");

  imgTag.style.position = "absolute";

  if(indiceR === 0) { imgTag.style.top = "3px"; }
  if(indiceR === 1) { imgTag.style.top = "80px"; }
  if(indiceR === 2) { imgTag.style.top = "157px"; }
  if(indiceC === 0) { imgTag.style.right = "157px"; }
  if(indiceC === 1) { imgTag.style.right = "80px"; }
  if(indiceC === 2) { imgTag.style.right = "3px"; }

  parent.appendChild(imgTag);

}

function creaImgTag(simbolo){
  let imgTag = document.createElement("img");

  if(simbolo === "x") { imgTag.src = "img/x.png"; }
  else { imgTag.src = "img/o.png"; }

  imgTag.width = "65";//px
  imgTag.height = "65";//px

  return imgTag;
}

//se non lo faccio,l'animazione viene prodotta una sola volta
function resettaAnimazioni(){
  let arr = document.getElementsByClassName('score');
  for(let i = 0; i < 3; i++){
    arr[i].style.animationName = '';
  }
}