using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour {
	public Camera camera; 
	public GameManager gm;
	public Inventory inv;
	public TextDisplay displayer;
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
	private Position prevPos = new Position (); // to check if player is falling
	public Position BackPos{
		get { return prevPos; } 
	}

	// Use this for initialization
	void Start () {
	
	}

	private bool toogleCamera = true;
	
	// Update is called once per frame
	void Update () {
		if (/*Input.GetKey(KeyCode.LeftArrow) ||*/ Input.GetKey(KeyCode.A)){
			transform.Rotate(-rotation);
		}else if (/*Input.GetKey(KeyCode.RightArrow) ||*/ Input.GetKey(KeyCode.D)){
			transform.Rotate(rotation);
		}else if (Input.GetKeyDown(KeyCode.Space)){
			Jump();
		//}else if (Input.GetKeyDown(KeyCode.UpArrow)){
		//	gm.canMove(1);
		//}else if (Input.GetKeyDown(KeyCode.DownArrow)){
		//	gm.canMove (-1);
		}else if (Input.GetKeyDown(KeyCode.Q)){
			if (toogleCamera) toogleCamera = false;
			else toogleCamera = true;
		}else if(Input.GetKeyDown(KeyCode.Z)){
			inv.triggerAnimation();
		}else{
			if (toogleCamera){
				if (Input.GetKey(KeyCode.W)){
					camera.transform.Rotate(-cameraRotation);
				}else if (Input.GetKey(KeyCode.S)){
					camera.transform.Rotate(cameraRotation);
				} 
			}else{
				if (Input.GetKeyDown(KeyCode.W)){
					gm.canMove(1);
				}else if (Input.GetKeyDown(KeyCode.S)){
					gm.canMove (-1);
				}
			}
		}
		if (turnup){
			if ((int)camera.transform.localEulerAngles.x%180!=90){
				camera.transform.Rotate(-cameraRotation);
			}
		}else if (transform.localPosition.y < 0){
			turnup = true;
			displayer.displayBadMove ();
			Invoke ("returnToGroud", tGround);
		}
	}

	// check if player has fell
	private bool turnup = false;
	public static int tGround = 3;
	
	private void returnToGroud(){
		if (inv.Lives > 0){
			if (gm.randomGround()){
				turnup = false;
				camera.transform.localEulerAngles = new Vector3(40,0,0);
				inv.Lives -= 1;
			}else{
				displayer.displayNoCubi ();
			}
			return;
		}
		displayer.displayDeath ();
	}

	public void newLocation(int i, int j, int k){
		print (i+" "+ j+" "+ k);
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
