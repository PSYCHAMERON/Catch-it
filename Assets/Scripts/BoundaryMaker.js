#pragma strict

public var leftBoundary : GameObject;
public var rightBoundary : GameObject;
public var character : GameObject;
  
function Awake () 
{
	var diff : Vector3 = transform.position - character.transform.position;
	
	diff.z = Mathf.Abs(diff.z);
	// diff.z has the distance between character and the main camera
	
	var pos : Vector3 = Camera.main.ScreenToWorldPoint( Vector3(Screen.width, 0, diff.z) );
	rightBoundary.transform.position = pos;		// place the right boundary
	
	pos = Camera.main.ScreenToWorldPoint( Vector3(0, 0, diff.z) );
	leftBoundary.transform.position = pos;			// place the left boundary
} // end of 

function Update () 
{

}