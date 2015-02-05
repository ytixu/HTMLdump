using UnityEngine;
using System.Collections;

public class Cubi : MonoBehaviour {
	public int x, y, z;
	public GameManager gm;
	private int _value = 0;
	public int Value{
		get { return _value;}
		set { _value = value;}
	}
	private bool isBomb = false;
	public bool Bomb{
		get { return isBomb; }
		set { isBomb = value; }
	}

	public int score(){
		if (isBomb)
			return -_value;
		return _value;
	}

	// when a cubi is blown
	private bool deflating = false;
	private static float minSize = 0.1f;
	private static float deflateRate = 0.95f;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if (deflating){
			if (transform.localScale.x > minSize){
				transform.localScale = transform.localScale*deflateRate;
			}else{
				Invoke ("distroySelf", 5);
			}
		}
	}

	private void distroySelf(){
		Destroy (gameObject);
		Destroy (this);
	}

	void OnMouseOver() {
		if (!deflating)	gm.moveSelector (this);
	}

	void OnMouseDown() {
		if (!deflating)	gm.openCubi(this);
	}

	public void newLocation(int i, int j, int k, int size){
		transform.localPosition = new Vector3 (size * i, 
		                                       size * j,
		                                       size * k);
	}

	public void move(Vector3 v){
		//if (Bomb){
		//	gm.openCubi(this);
		//	return;
		//}
		deflating = true;
		Rigidbody rb = this.gameObject.AddComponent<Rigidbody>();
		//rb.useGravity = false;
		//rb.drag = 1;
		rb.freezeRotation = true;
		rb.AddForce ((transform.position - v + Vector3.up)*40);
	}
}
