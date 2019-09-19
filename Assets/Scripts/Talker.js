#pragma strict

public var master : String = "test";
//public var oScript: TListener;
public var prefab : GameObject;
 
function Start()
{
	this.gameObject.SetActive(false);
	this.gameObject.SetActive(true);
	var pos : Vector3 = Camera.main.ScreenToWorldPoint( Vector3(Screen.width, Screen.height, 10) );
	transform.position = pos;
	 print("this is the the first print");
    yield WaitForSeconds(4);
    print("tis es aftar 4 sekend");
	  
	prefab.GetComponent(TListener).changeThis++;  
	prefab.GetComponent(TListener2).changeThis2++;
} // end of Start

function Update ()
{
    //Talker ("Yeti") ;  
    prefab.GetComponent(TListener2).changeThis2++;

}
 
function  Talker (test1 : String)
{
    //oScript.TListener (test1);
    //prefab.GetComponent(TListener).TListener(test1);
    
    //var ghorarDim : float = prefab.GetComponent(TListener).dohaiLageKajKor;
    //Debug.Log(ghorarDim); // works
    
    //print("test successful from Talker");
}