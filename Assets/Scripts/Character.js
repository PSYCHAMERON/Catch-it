#pragma strict

var lastX : float; // this will store the last position of the character
var isMoving : boolean = false; // flags whether or not the player is in motion
var isVulnerable : boolean;

var explosion : GameObject;
var catchSound : AudioClip;
var painSound : AudioClip;
var bombSounds : AudioClip[];
var dyingSound : AudioClip;
var clockPickUpSound : AudioClip;
var healthPickUpSound : AudioClip;
var drugPickUpSound : AudioClip;
var shieldPickUpSound : AudioClip;
var shieldSound : AudioClip;
var movingFastSound : AudioClip;

var playerScore : GUIText;
var score : int;
var life : int;
var canPause : boolean;
var gameGUIHolder : GameObject;
var gameController : GameObject;
/////////////////////////////////////////
public var characterSpeed : float;
public var leftBoundary : GameObject;
public var rightBoundary: GameObject;
//////////////////////////////////////////////
private var isDead : boolean;
private var maxLife : int;
public  var movingFast : boolean; // controlled by gameController
private var go : GameObject;

function Awake()
{
	gameGUIHolder.GetComponent(GameGUI).showWindow = false;
	Time.timeScale = 1.0f;
}

function Start () 
{
	go = gameObject.Find("Armature/Guy");
	//gameGUIHolder.GetComponent(GameGUI).bark++;
	//prefab.GetComponent(TListener).changeThis++;
	//gameController.GetComponent(GameController).playerLife = 10;
	movingFast = false;
	isVulnerable = true;
	gameGUIHolder.GetComponent(GameGUI).showWindow = false;
	score = 0;
	life = 5;
	maxLife = 5;
	//playerScore.text = "Score: " + score.ToString() + "\nLife: " + life;
	animation.Stop(); // this stops Unity from playing the character's default animation.
	isDead = false;	// player is not dead at the beginning of the game
	canPause = true; // can pause the game at the beginning
	UpdateController();
	//ClampCharacter();
} // end of Start

function UpdateController()
{
		gameController.GetComponent(GameController).playerLife = life;
		gameController.GetComponent(GameController).playerScore = score;
}

function ClampCharacter()
{
	/*
	var viewPos : Vector3 = Camera.main.WorldToViewportPoint(transform.position);
 	viewPos.x = Mathf.Clamp01(viewPos.x);
 	viewPos.y = Mathf.Clamp01(viewPos.y);
 	transform.position = Camera.main.ViewportToWorldPoint(viewPos);
 	
 	transform.position.z = -16;
 	transform.position.y = 0;
 	*/
 	
 	if( transform.position.x > rightBoundary.transform.position.x )
 	{	
 		transform.position.x = rightBoundary.transform.position.x;
 	} // end of if
 	else if( transform.position.x < leftBoundary.transform.position.x )
 	{
 		transform.position.x = leftBoundary.transform.position.x;
 	} // end of else if
 	
} // end of ClampCharacter

function OnTriggerEnter(col : Collider)
{
	if(isDead) return; //  dead, nothing to do!
	
	var oldPos : Vector3 = col.gameObject.transform.position;
	col.gameObject.GetComponent(FallingObject).ResetPosition();
	if(col.gameObject.CompareTag("bomb"))
	{
		// I got hit by a bomb!
		Instantiate(explosion, oldPos, Quaternion.identity); // show explosion
		audio.PlayOneShot(bombSounds[Random.Range(0, bombSounds.length)]); // play explosion sound
		
		if(isVulnerable) life--;
		if(life == 0)
		{
			// YOU ARE DEAAAAAAAADDD!!!
			isDead = true;
			audio.PlayOneShot(dyingSound);		// play dying sound
			animation.Stop();							// stop playing any animation
			Destroy(collider);								// we don't need collider any more!
			return; 
			//Application.LoadLevel("Title");
		} // end of if
		if(isVulnerable) audio.PlayOneShot(painSound); // sound of pain
		else audio.PlayOneShot(shieldSound);			// sound of shield
	} // end of if
	else if(col.gameObject.CompareTag("stein"))
	{
		audio.PlayOneShot(catchSound);
		animation.Play("catch"); // Ima catch that stein!
		lastX = transform.position.x;
		score++;
	} // end of else if
 	else if(col.gameObject.CompareTag("health"))
 	{
 		if(life < maxLife) life++;
 		audio.PlayOneShot(healthPickUpSound);
 		//gameController.GetComponent(GameController).playerHitHealth = true;
 		col.gameObject.GetComponent(FallingObject).ResetPosition();
 		col.gameObject.GetComponent(FallingObject).fallDown = false;
 	}// end of else if
 	else if(col.gameObject.CompareTag("clock") )
 	{
 		audio.PlayOneShot(clockPickUpSound);
 		gameController.GetComponent(GameController).slowDownTime =  true; // the world goes cold!!!
 		col.gameObject.GetComponent(FallingObject).ResetPosition();
 		col.gameObject.GetComponent(FallingObject).fallDown = false;
 	} // end of else if
 	else if(col.gameObject.CompareTag("drug") )
 	{
 			audio.PlayOneShot(drugPickUpSound);
 			gameController.GetComponent(GameController).movePlayerFast = true; 
 			col.gameObject.GetComponent(FallingObject).ResetPosition();
 			col.gameObject.GetComponent(FallingObject).fallDown = false;
 	}
 	else if(col.gameObject.CompareTag("shield"))
 	{
 			audio.PlayOneShot(shieldPickUpSound);
 			//gameController.GetComponent(GameController).movePlayerFast = true; 
 			col.gameObject.GetComponent(FallingObject).ResetPosition();
 			col.gameObject.GetComponent(FallingObject).fallDown = false;		
 			StartCoroutine(ShieldEffect());
 	}
 	UpdateController();
} // end of OnTriggerEnter

function DisappearPlayer(val : boolean)
{
	go.renderer.enabled = !val;
}

function ShieldEffect()
{
	isVulnerable = false; // don't take damage for some times
	gameGUIHolder.GetComponent(GameGUI).showShieldTexture = true;
	gameController.GetComponent(GameController).shieldActive = true; // shield activated
	yield WaitForSeconds(5.0f);
	isVulnerable = true; // now, take damage!		
	gameGUIHolder.GetComponent(GameGUI).showShieldTexture = false;
	gameController.GetComponent(GameController).shieldActive = false; // shield deactivated
}
private var tester : int; 

function Update () 
{
	//if(gameGUIHolder.GetComponent(GameGUI).showWindow) print("showing window...........");
	//else print("not showing window.....................");
	
	gameGUIHolder.GetComponent(GameGUI).numOfLife = life;
	gameGUIHolder.GetComponent(GameGUI).theScore = score;
	if (Input.GetKeyDown(KeyCode.Escape) && canPause) 
	{
		//ESC pressed
		gameGUIHolder.GetComponent(GameGUI).windowMessage = "GAME PAUSED";
		gameGUIHolder.GetComponent(GameGUI).showWindow = !gameGUIHolder.GetComponent(GameGUI).showWindow;
		Time.timeScale = Mathf.Abs(Time.timeScale-1);
	} // end of if
	//playerScore.text = "Score: " + score.ToString() + "\nLife: " + life; // update the text
	if(isDead) 
	{
		DeadMovement();
		return; // GO HOME, YOU ARE DEAD! 
	} // end of if
	
	var halfW : float = Screen.width / 2;
	
	//transform.position.x = (Input.mousePosition.x) / 20 ;
	var translation : float = Input.GetAxis("Horizontal");
	transform.position.x += translation * Time.deltaTime * characterSpeed;
	if(!movingFast) tester = 15; 
	if(!animation.IsPlaying("catch") && !animation.IsPlaying("idle") )
	{
		animation.Play("step");
		
		if(movingFast) 
		{
			if(tester >= 15) 
			{
				audio.PlayOneShot(movingFastSound, 0.3); tester = 0;
			}
			else tester++;
		}
	} 
	
	if(lastX != transform.position.x)
	{
		// x values between this Update cycle and the last one
		// aren't the same! That means the player is moving the mouse.
		if(!isMoving)
		{
			// the player was standing still.
			// Let's flag him to "isMoving"
			
			isMoving = true;
			if(!animation.IsPlaying("catch")) 
			{
				animation.Play("step");
			}
		} // end of if
	} // end of if
	else
	{
		// The player's x position is the same this Update cycle
		// as it was the last! The player has stopped moving the mouse.
			
		if(isMoving)
		{
			// The player has stopped moving, so let's update the flag
			isMoving = false;
			
			if(!animation.IsPlaying("catch")) 
			{
				animation.Play("idle");
			}
		} // end of if
		else
		{
			if(!animation.IsPlaying("catch"))
			{
				animation.Play("idle");
			}
		} // end of else
		
	} // end of else
	
	ClampCharacter();	// don't let the character go out of the screen
	
	lastX = transform.position.x;

	if(!isVulnerable)
	{
		if(!gameGUIHolder.GetComponent(GameGUI).showFlickeringTexture) DisappearPlayer(true);
		else DisappearPlayer(false);
	} // end of if
	else DisappearPlayer(false);
	
} // end of Update

function DeadMovement()
{
	//var currentRotation : Vector3 = transform.rotation.eulerAngles;	// current rotation in Euler Angles
	//if(transform.rotation.eulerAngles.z > 270) return;
	if(270 < transform.rotation.eulerAngles.z  && transform.rotation.eulerAngles.z < 280) 
	{ 
		gameGUIHolder.GetComponent(GameGUI).windowMessage = "GO HOME, YOU ARE DEAD!";
		gameGUIHolder.GetComponent(GameGUI).showWindow = true; // show game over window  
		
		var oldHighScore : int = PlayerPrefs.GetInt("highScore");
		if(score > oldHighScore)
		{ // a new high score
			PlayerPrefs.SetInt("highScore", score); // save the new high score 
			gameGUIHolder.GetComponent(GameGUI).isHighscore = true;
		} // end of if
		
		canPause = false; // player cannot pause any more
		return; 
	} 
	//currentRotation.z -= 0.25 * Time.deltaTime;
	
	//Debug.Log(currentRotation);
	transform.rotation.eulerAngles.z -= 25 * Time.deltaTime;
	//transform.rotation = Quaternion.Euler(currentRotation.x, currentRotation.y, -90);
	//Debug.Log("bingo");
	//transform.rotation.x = 0;
	//transform.rotation.y = 90;
} // end of DeadMovement