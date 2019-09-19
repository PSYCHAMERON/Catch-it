#pragma strict

function Start () 
{
	StartCoroutine(MyCoroutine());
}

function Update () 
{
	print("haha haha haha");
}

function MyCoroutine()
{
	print("first line");
	yield WaitForSeconds(3);
	print("second line");
}