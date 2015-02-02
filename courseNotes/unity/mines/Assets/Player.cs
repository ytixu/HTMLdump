using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown(KeyCode.Q)){
			transform.position += transform.forward*GameSetter.t;
		}else if (Input.GetKeyDown(KeyCode.A)){
			transform.position -= transform.forward*GameSetter.t;
		}else if (Input.GetKey(KeyCode.W)){
			transform.position += transform.forward*GameSetter.t;
		}else if (Input.GetKey(KeyCode.S)){
			transform.position -= transform.forward*GameSetter.t;
		}else if (Input.GetKey(KeyCode.LeftArrow)){
			transform.Rotate(new Vector3(0,1,0));
		}else if (Input.GetKey(KeyCode.RightArrow)){
			transform.Rotate (new Vector3(0,-1,0));
		}else if (Input.GetKey(KeyCode.UpArrow)){
			transform.Rotate (new Vector3(-1, 0,0));
		}else if (Input.GetKey(KeyCode.DownArrow)){
			transform.Rotate (new Vector3(1, 0,0));
		}
	}
}
