#pragma strict

function LateUpdate()
{
	try{
		if(!particleSystem.IsAlive())
		{
			Destroy(this.gameObject);
		}
	}
	catch(err)
	{
	}
	
}

