using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour {
	public Camera camera;

	private Vector3 rotation = new Vector3 (0, 1, 0);
	private Vector3 cameraRotation = new Vector3 (1, 0, 0);

	private CubiCloud cloud;
	public CubiCloud Cloud{
		set { cloud = value; }
		get { return cloud; } 
	}

	public class Position{
		public int i, j, k;
		public Position(){
			i=0; j=0; k=0;
		}
		public Position(int a, int b, int c){
			i=a; j=b; k=c;
		}
		public string toString(){
			return i + " " + j + " " + k;
		}
	}

	private Position selectorPosition;
	public Position selectorPos{
		get { return selectorPosition; }
	}

	public void setSelectorPos(int i, int j, int k){
		selectorPosition.i = i;
		selectorPosition.j = j;
		selectorPosition.k = k;
	}
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKey(KeyCode.LeftArrow)){
			transform.Rotate(-rotation);
		}else if (Input.GetKey(KeyCode.RightArrow)){
			transform.Rotate(rotation);
		}else if (Input.GetKey(KeyCode.W)){
			camera.transform.Rotate(-cameraRotation);
		}else if (Input.GetKey(KeyCode.S)){
			camera.transform.Rotate(cameraRotation);
		}
	}

	public void newLocation(int i, int j, int k){
		transform.localPosition = new Vector3 (cloud.stepSize * i, 
		                                       cloud.stepSize * j,
		                                       cloud.stepSize * k);
	}

	public void newLocation(Position p){
		newLocation (p.i, p.j, p.k);
	}

	public Position getLocation(){
		return new Position(
			(int)Mathf.Round (transform.localPosition.x/cloud.stepSize), 
			(int)Mathf.Round (transform.localPosition.y/cloud.stepSize), 
			(int)Mathf.Round (transform.localPosition.z/cloud.stepSize));

	}

	public Position getNextStep(int direction){
		Position temp = getLocation ();
		return new Position (
			(int)Mathf.Round (temp.i + direction * transform.forward.x), 
			(int)Mathf.Round (temp.j + direction * transform.forward.y), 
			(int)Mathf.Round (temp.k + direction * transform.forward.z));
	}

	public void Jump() { 
		rigidbody.AddForce(Vector3.up*cloud.stepSize*200);
	}
}
