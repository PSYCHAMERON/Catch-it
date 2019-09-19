#pragma strict

function Start () {
	var pos : Vector3 = Camera.main.ScreenToWorldPoint( Vector3(Screen.width, Screen.height, 100) );
	transform.position = pos;
}

function Update () {

}