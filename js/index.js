"use strict";

let ripetizioni = 0;
let _refInterval;
let punti=0;
let colors = ["bg-warning","bg-success","bg-primary","bg-danger"];
let marche=["Fiat","Renault","Ford","Peugeot"];
window.onload = function (){
    //region  generazione wrapper superiore
    let wrapperVal=document.createElement("div");
    wrapperVal.id="wrapperVal";
    wrapperVal.classList.add("mx-auto","bg-light");
    document.getElementsByTagName("body")[0].append(wrapperVal);
    let wrapper=document.createElement("div");
    wrapper.id="wrapper";
    wrapper.classList.add("mx-auto");
    document.getElementsByTagName("body")[0].append(wrapper);
    let rowVal=document.createElement("div");
    rowVal.classList.add("row");
    wrapperVal.append(rowVal);
    let numAction=document.createElement("div");
    numAction.classList.add("col-sm-6");
    rowVal.append(numAction);
    let numVal=document.createElement("div");
    numVal.classList.add("col-sm-6");
    rowVal.append(numVal);
    let labelAction=document.createElement("h3");
    numAction.append(labelAction);
    labelAction.innerHTML="Marca Automobili";
    let simboloAction=document.createElement("div");
    simboloAction.id="divAction";
    numAction.append(simboloAction);
    simboloAction.classList.add("simboli");
    let labelValue=document.createElement("h3");
    numVal.append(labelValue);
    labelValue.innerHTML="Auto vendute";
    let simboloValue=document.createElement("div");
    simboloValue.id="divValue";
    numVal.append(simboloValue);
    simboloValue.classList.add("simboli");
    //endregion

    //region generazione grafico
    let rowGrafico=document.createElement("div");
    for(let i=0;i<4;i++){
        let divG=document.createElement("div");
        wrapper.append(divG);
        divG.id=marche[i];
        divG.innerHTML=marche[i];
        divG.style.border="1px solid black";
        divG.style.width="248px";
        divG.style.textAlign="center";
        divG.style.bottom="0px";
        divG.style.display="inline-block";
        divG.style.position="absolute";
        divG.style.right=250*i+"px";
        divG.classList.add(colors[i]);
        divG.style.height="30px";
        divG.style.lineHeight="30px";
        divG.style.fontSize="20pt";
        divG.style.fontWeight="bold";
        divG.addEventListener("mouseover",function (){
            showValue(this);
        });
        divG.addEventListener("mouseout",function (){
            hideValue();
        });
    }
    //endregion

    //region generazione Button
    let btnGioca=document.createElement("button");
    btnGioca.classList.add("btn","btn-success");
    btnGioca.id="btnGioca";
    document.getElementsByTagName("body")[0].append(btnGioca);
    btnGioca.innerHTML="START - ANALISI VENDITE";
    btnGioca.addEventListener("click",gioca);
    let divRis=document.createElement("div");
    divRis.id="divRis";
    divRis.classList.add("mx-auto");
    document.getElementsByTagName("body")[0].append(divRis);
    document.getElementById("divRis").style.visibility = "hidden";
    //endregion
}

function showValue(div){
    document.getElementById("divRis").innerHTML = div.innerHTML;
    document.getElementById("divRis").style.visibility = "visible";
}

function hideValue(){
    document.getElementById("divRis").innerHTML = "";
    document.getElementById("divRis").style.visibility = "hidden";
}

function gioca(){
    ripetizioni=0;
    _refInterval = setInterval(trade, 100);
}

function trade(){
    if(ripetizioni<10) {
        document.getElementById("divAction").innerHTML = marche[Math.floor(4 * Math.random())];
        document.getElementById("divValue").innerHTML = Math.floor(50 * Math.random() + 1);
        ripetizioni++;
    }else {
        clearInterval(_refInterval);
        document.getElementById(document.getElementById("divAction").innerHTML).style.height=(parseInt(document.getElementById(document.getElementById("divAction").innerHTML).style.height) + parseInt(document.getElementById("divValue").innerHTML))+"px";
        document.getElementById(document.getElementById("divAction").innerHTML).style.lineHeight=parseInt(document.getElementById(document.getElementById("divAction").innerHTML).style.height)+"px";
        document.getElementById(document.getElementById("divAction").innerHTML).innerHTML = document.getElementById("divAction").innerHTML + " - " + (document.getElementById(document.getElementById("divAction").innerHTML).style.height).split("px")[0];
        let marcaVincente=controllaVendite();
        if(marcaVincente!=""){
            document.getElementById("divRis").innerHTML = "La migliore casa automobilistica è: " + marcaVincente;
            document.getElementById("divRis").style.visibility = "visible";
        }else
            setTimeout(gioca,2000);
    }
}

function controllaVendite(){
    let marca="";
    let max=0;
    for(let i=0;i<4;i++){
        console.log(parseInt(document.getElementById(marche[i]).style.height.split("px")[0]))
        console.log(marche[i]);
        if(parseInt(document.getElementById(marche[i]).style.height.split("px")[0])>300 && parseInt(document.getElementById(marche[i]).style.height.split("px")[0])>max) {
            max=parseInt(document.getElementById(marche[i]).style.height.split("px")[0]);
            marca = marche[i];
        }
    }
    return marca;
}