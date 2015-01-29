using UnityEngine;
using System.Collections;

public class Gun : MonoBehaviour {

	public Vector3 getNuzzlePos(){
		return transform.FindChild ("nuzzle").position;
	}
}
