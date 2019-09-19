#pragma strict

var slave : String;
var dohaiLageKajKor: float = 420;

public var changeThis : float;

var respawn : GameObject;

function Start()
{
	changeThis = 5;
	
	respawn = GameObject.FindWithTag("Cube2");
	respawn.GetComponent(Talker).Talker("shuvo");
}

function Update()
{
	//dohaiLageKajKor++;
	//print(changeThis);
	//var respawn : GameObject = GameObject.FindWithTag("Cube2");
	//respawn.GetComponent(Talker).Talker("shuvo");
	
//	if(respawn.activeSelf) print("active");
//	else print("not active");
}

function  TListener (test1 : String)
{
    var test2 = test1;
   // print(test2);
}