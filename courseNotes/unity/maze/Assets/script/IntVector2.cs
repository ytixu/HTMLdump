using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class IntVector2 {
	public int x;
	public int z;

	public IntVector2(int a, int b){
		x = a;
		z = b;
	}

	public IntVector2(IntVector2 v){
		x = v.x;
		z = v.z;
	}
	
	public bool equals(IntVector2 v){
		if (x == v.x && z == v.z) 
			return true;
		return false;
	}
	
	// Manhattan distance
	public int mDistance(IntVector2 v){
		return (int)(Mathf.Abs (x - v.x) + Mathf.Abs (z - v.z));
	}
	
	public IntVector2 add(IntVector2 v){
		return new IntVector2 (v.x + x, v.z + z);
	}

	public IntVector2 mult(int a){
		return new IntVector2 (a * x, a * z);
	}

	public IntVector2 mult(int a, int b){
		return new IntVector2 (a * x, b * z);
	}

	// shuffling algorithm
	public static void shuffle(List<IntVector2> lst){
		int l = lst.Count;
		for (int k=0; k<l-1; k++){
			int index = Random.Range(0,l-k)+k;
			IntVector2 temp = lst[k];
			lst[k] = lst[index];
			lst[index] = temp;
		}
	}

	public static void shuffle(IntVector2[] lst){
		int l = lst.Length;
		for (int k=0; k<l-1; k++){
			int index = Random.Range(0,l-k)+k;
			IntVector2 temp = lst[k];
			lst[k] = lst[index];
			lst[index] = temp;
		}
	}

	public string toString(){
		return string.Format("x:{0}, z:{1}", x, z);
	}
}
