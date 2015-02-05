using UnityEngine;
using System.Collections;

public class Selector : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public bool toggleEnabled(){
		if (renderer.enabled){
			renderer.enabled = false;
		}else{
			renderer.enabled = true;
		}
		return renderer.enabled;
	}

	public void showInCubi(Cubi c){
		transform.position = c.transform.position;
	}
}
