#pragma strict

var playerLife : int;					//
var playerScore : int;				//		

var slowDownTime : boolean;	//
var movePlayerFast : boolean; // these are controlled by Character.js

var theClock : GameObject;
var theHealth : GameObject;
var theDrug : GameObject;
var theShield : GameObject;
var boma : GameObject;
var backgroundMusic : GameObject;
var gameGUIHolder : GameObject;

private var levelInterval : int;
private var clockInterval : int;
private var healthInterval : int;
private var drugInterval : int;
private var shieldInterval : int;

private var curLevel : int;
private var maxLevel : int;

private var lastLevelUpdateScore : int;
private var lastClockUpdateScore : int;
private var lastHealthUpdateScore : int;
private var lastDrugUpdateScore : int;
private var lastShieldUpdateScore : int;

private var slown : boolean;
private var movingFast : boolean;
public var shieldActive : boolean; // controlled by Character.js

function Start () 
{
	//gameGUIHolder.GetComponent(GameGUI).showWindow = false;
	theClock.GetComponent(FallingObject).fallDown = false;
	theHealth.GetComponent(FallingObject).fallDown = false;
	theDrug.GetComponent(FallingObject).fallDown = false;  
	theShield.GetComponent(FallingObject).fallDown = false;  
	
	theClock.GetComponent(FallingObject).continuousFall = false;
	theHealth.GetComponent(FallingObject).continuousFall = false; // they fall once
	theDrug.GetComponent(FallingObject).continuousFall = false; // Drug fall once
	theShield.GetComponent(FallingObject).continuousFall = false; // Drug fall once
	
	slowDownTime = false;
	slown = false;
	
	movePlayerFast = false;
	movingFast = false;
	shieldActive = false;
		
	clockInterval = 4;
	healthInterval = 8;
	levelInterval = 15;
	drugInterval = 5;
	shieldInterval = 3;
	
	maxLevel = 3;
	curLevel = 0; // level 1 to 3
	lastLevelUpdateScore = -1;
	lastClockUpdateScore = -1;
	lastHealthUpdateScore = -1;
	lastDrugUpdateScore = -1;
	lastShieldUpdateScore = -1;
}

function Update () 
{
	if(playerScore % levelInterval == 0 && curLevel != maxLevel && lastLevelUpdateScore != playerScore)
	{
		NextLevel();
	}
	if(playerScore % clockInterval == 0 && lastClockUpdateScore != playerScore && playerScore != 0 && !slown) Spawn(2);
	if(playerScore % healthInterval == 0 && lastHealthUpdateScore != playerScore && playerScore != 0) Spawn(1);
	if(slowDownTime && !slown) 
	{
		slown = true;
		SlowMotion();
	}
	if(playerScore % drugInterval == 0 && lastDrugUpdateScore != playerScore && playerScore != 0 && !movingFast)
	{
		Spawn(3); // Druggggggggggggggg!
	}
	if(playerScore % shieldInterval == 0 && lastShieldUpdateScore != playerScore && playerScore != 0 && !shieldActive)
	{ // shieldActive is controlled by Character.js
		Spawn(4); // shield
	}
	if(movePlayerFast && !movingFast)
	{
		movingFast = true;
		MoveFast();
	} // end of if
	//print(curLevel);
}

function NextLevel() // one more bomb!
{
	curLevel++;
	lastLevelUpdateScore = playerScore;
	// instantiate a bomb
	//static Object Instantiate(Object original, Vector3 position, Quaternion rotation);
	var bombClone : GameObject;
	bombClone = Instantiate(boma, Vector3(0.0f, 0.0f, 0.0f), Quaternion.identity);
	bombClone.GetComponent(FallingObject).ResetPosition(); // reset the bomb position
	if(slown) bombClone.GetComponent(FallingObject).speed = 50 * 0.4f;
	bombClone.SetActive(true); // activate
}

function Spawn(id : int)
{
	// id = 1, health
	// id = 2, clock
	// id = 3, drug
	// id = 4, shield
	if(id == 1) 
	{
		theHealth.GetComponent(FallingObject).fallDown = true;
		theHealth.GetComponent(FallingObject).ResetPosition(); // reset the position
		lastHealthUpdateScore = playerScore;		
	}
	else if(id == 2) 
	{
		theClock.GetComponent(FallingObject).fallDown = true;
		theClock.GetComponent(FallingObject).ResetPosition(); // reset the position
		lastClockUpdateScore = playerScore;
	}
	else if(id == 3)
	{
		theDrug.GetComponent(FallingObject).fallDown = true;
		theDrug.GetComponent(FallingObject).ResetPosition(); // reset the position
		lastDrugUpdateScore = playerScore;
	}
	else if(id == 4)
	{
		theShield.GetComponent(FallingObject).fallDown = true;
		theShield.GetComponent(FallingObject).ResetPosition(); // reset the position
		lastShieldUpdateScore = playerScore;	
	}
}

function SlowMotion()
{
	var bombs : GameObject[];
	var glass : GameObject[];
	bombs = GameObject.FindGameObjectsWithTag("bomb");
	glass = GameObject.FindGameObjectsWithTag("stein");
	var previousBombSpeed : float;
	var previousGlassSpeed : float;
	var previousHealthSpeed : float;
	var previousDrugSpeed : float;
	var previousShieldSpeed : float;
	var percentSpeed : float = 0.4;
	
	previousBombSpeed  = bombs[0].GetComponent(FallingObject).speed;
	previousGlassSpeed = glass[0].GetComponent(FallingObject).speed;
	previousHealthSpeed = theHealth.GetComponent(FallingObject).speed;
	previousDrugSpeed = theDrug.GetComponent(FallingObject).speed;
	previousShieldSpeed = theShield.GetComponent(FallingObject).speed;
	// now slow down bombs
	backgroundMusic.GetComponent(AudioSource).audio.pitch = 0.8; // slow down sound
	for(var i : int = 0; i < bombs.length; i++)
	{
		bombs[i].GetComponent(FallingObject).speed = previousBombSpeed * percentSpeed;
	}
	glass[0].GetComponent(FallingObject).speed = previousGlassSpeed * percentSpeed;
	theHealth.GetComponent(FallingObject).speed = previousHealthSpeed * percentSpeed; // slow down the health
	theDrug.GetComponent(FallingObject).speed = previousDrugSpeed *percentSpeed; // slow down the drug
	theShield.GetComponent(FallingObject).speed = previousShieldSpeed *percentSpeed; // slow down the shield
	// change GUI
	gameGUIHolder.GetComponent(GameGUI).showClockTexture = true;
	//WAIT, wait,  waitttttt wwatttttt
	yield WaitForSeconds(5); // wait for seconds
	// restore the speeds, and, the sound
	bombs = GameObject.FindGameObjectsWithTag("bomb");							// >
	for(var ii : int = 0; ii < bombs.length; ii++)												// >
	{																											// >
		bombs[ii].GetComponent(FallingObject).speed = previousBombSpeed;		// >
	}																											// >
	glass[0].GetComponent(FallingObject).speed = previousGlassSpeed;				// >
	theHealth.GetComponent(FallingObject).speed = previousHealthSpeed; 		// >
	theDrug.GetComponent(FallingObject).speed = previousDrugSpeed;			// >
	theShield.GetComponent(FallingObject).speed = previousShieldSpeed; 		// restore speed
 	slowDownTime = false;
	slown = false;
	backgroundMusic.GetComponent(AudioSource).audio.pitch = 1; 
	// restore GUI
	gameGUIHolder.GetComponent(GameGUI).showClockTexture = false;
}

function MoveFast()
{
	var thePlayer : GameObject = GameObject.FindWithTag("player");
	var previousPlayerSpeed : float = thePlayer.GetComponent(Character).characterSpeed; // get the previous speed         
	var percentSpeed : float = 2.0f;
	// make fast
	//backgroundMusic.GetComponent(AudioSource).audio.pitch = 1.5; 
	//change GUI, show
	gameGUIHolder.GetComponent(GameGUI).showDrugTexture = true;
	thePlayer.GetComponent(Character).characterSpeed = previousPlayerSpeed * percentSpeed;
	thePlayer.GetComponent(Character).movingFast = true;
	yield WaitForSeconds(5);		// wait
	// restore
	thePlayer.GetComponent(Character).characterSpeed = previousPlayerSpeed;  
	movePlayerFast = false;
	movingFast = false;    
	thePlayer.GetComponent(Character).movingFast = false; 
	//backgroundMusic.GetComponent(AudioSource).audio.pitch = 1; 
	//change GUI, hide
	gameGUIHolder.GetComponent(GameGUI).showDrugTexture = false;

} // end of MoveFast