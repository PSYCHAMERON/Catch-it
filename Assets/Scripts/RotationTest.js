#pragma strict



function Start () 
{
	//transform.rotation = Quaternion.Euler( Vector3(5, 6, -90) );
	
	//transform.rotation.eulerAngles = Vector3(5, 6, -90);
	
	transform.rotation.eulerAngles.z -= 0.25 * Time.deltaTime;
	
	/*
	transform.rotation.x = 5;
	transform.rotation.y = 6;
	transform.rotation.z = 7;
	
	Debug.Log(transform.rotation.eulerAngles);
	*/
}

function Update () 
{
	transform.rotation.eulerAngles.z -= 5 * Time.deltaTime;
	
}