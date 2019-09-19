#pragma strict

var prefab : GameObject;
var speed : int;
var audioClips : AudioClip[];
var powerUpSound : AudioClip;

private var leftX : float;
private var rightX : float;

public var leftBoundary : GameObject;
public var rightBoundary : GameObject;
public var showParticle : boolean;
public var playSound : boolean;
public var fallDown : boolean;
public var continuousFall : boolean;

//private var bombs : GameObject[];
//private var glasses : GameObject[];

function Awake()
{
	continuousFall = true;
}

function Start () 
{
	leftX = leftBoundary.transform.position.x;
	rightX = rightBoundary.transform.position.x;
	// cache the objects
	//bombs = GameObject.FindGameObjectsWithTag("bomb");
	//glasses = GameObject.FindGameObjectsWithTag("stein");
	
}

function Update () 
{
	if(fallDown) transform.position.y -= speed * Time.deltaTime;
	
	if(transform.position.y < 0)
	{	
		if(playSound) audio.PlayOneShot(audioClips[Random.Range(0, audioClips.length)]);
		if(showParticle) Instantiate(prefab, transform.position, Quaternion.identity);
		
		/*
		vector3 v3Right = new Vector3(Screen.width,0,0);
 		v3Right = Camera.main.ScreenToViewportPoint(v3Right);
 		v3Right = new Vector3(v3Right.x, .5f, 10);
		 v3Right = Camera.main.ViewportToWorldPoint(v3Right);
		*/
		/*
		var v3right : Vector3 = Vector3(Screen.width, 0, 0);
		v3right = Camera.main.ScreenToViewportPoint(v3right);
		 v3right = Vector3(v3right.x, 0.5f, 10);
		 v3right = Camera.main.ViewportToWorldPoint(v3right);
		*/
		//var varrr : Vector3 = Camera.main.ScreenToWorldPoint(  Vector3(Screen.width, Screen.height, Camera.main.farClipPlane/2 ) );
		/*
		transform.position.y = 50;
		transform.position.x = Random.Range( leftX , rightX);
		transform.position.z = -16;
		*/
		//print( gameObject.tag );
		ResetPosition();
		if(!continuousFall) { fallDown = false;  audio.PlayOneShot(powerUpSound, 0.8); }  
	} // end of if
}

function ResetPosition()
{
		transform.position.y = Random.Range(60, 100);
		transform.position.x = Random.Range(leftX , rightX);
		transform.position.z = -16;
		
	//	print("Resetting position");
	//	print("leftX: "+leftX+"rightX: "+rightX);
		/*
		var i : int; 
		for(i = 0; i < bombs.length; i ++)
		{
			if(bombs[i] == gameObject) continue; 
			
			if( Mathf.Abs(bombs[i].transform.position.x - gameObject.transform.position.x) < 5)
			{
				transform.position.x = Random.Range(leftX, rightX);
				i = 0; //start from the beginning
				continue;
			} // end of if
		}//end of for
		
		for(i = 0; i < glasses.length; i ++)
		{
			if(glasses[i] == gameObject) continue; 
			
			if( Mathf.Abs(glasses[i].transform.position.x - gameObject.transform.position.x) < 5)
			{
				transform.position.x = Random.Range(leftX, rightX);
				i = 0; //start from the beginning
				continue;
			} // end of if
		}//end of for
		*/
} // end of ResetPosition