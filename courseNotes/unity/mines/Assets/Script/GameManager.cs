using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour {

	public Cubi cubi;
	public Player player;
	public CubiCloud cloud;
	public Selector selector;
	public Material[] tileColor;
	
	private Cubi[,,] matrix;

	// Use this for initialization
	void Start () {

	}

	private bool inBound(Player.Position p){
		if (p.i > -1 && p.i < cloud.width && p.j > -1 && p.j < cloud.height &&
		    p.k > -1 && p.k < cloud.depth){
			return true;
		}
		return false;
	}

	private Cubi getCubi(Player.Position p){
		//print (p.toString ());
		if (inBound(p)){
			return matrix [p.i,p.j,p.k];
		}else{
			return null;
		}
	}

	private bool canMove(int direction){
		Player.Position p = player.getNextStep (direction);
		if (getCubi(p) == null){
			player.newLocation(p);
			return true;
		}
		return false;
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetKeyDown(KeyCode.UpArrow)){
			canMove(1);
		}else if (Input.GetKeyDown(KeyCode.DownArrow)){
			canMove (-1);
		}else if (Input.GetKeyDown(KeyCode.D)){
			player.Jump();
		}else if (Input.GetKeyDown(KeyCode.Tab)){

		}
	}

	// drawing the cubis

	private Cubi drawCubi(int i, int j, int k, CubiCloud.cellValue[,,] grid){
		Cubi temp = GameObject.Instantiate(cubi) as Cubi;
		temp.transform.parent = cloud.transform;
		temp.transform.localScale = new Vector3 (cloud.cubiSize, cloud.cubiSize, cloud.cubiSize);
		temp.newLocation(i,j,k,cloud.cubiSize);
		if (grid[i,j,k] != null){
			temp.value = grid [i, j, k].val;
			temp.bomb = grid [i, j, k].isBomb;
		}
		if (temp.value < 12)
				temp.renderer.material = tileColor [temp.value];
		return temp;
	}
		
	// draw the cubes
	public void distributeCubes(){
		matrix = new Cubi[cloud.width, cloud.height, cloud.depth];
		// set up the bombs
		CubiCloud.cellValue[,,] grid = cloud.distributeBombs ();
		// player at the center
		player.Cloud = cloud;
		player.transform.parent = cloud.transform;
		player.newLocation(cloud.width/2, cloud.height/2, cloud.depth/2);
		drawCubi(cloud.width/2, cloud.height/2-1, cloud.depth/2, grid);
		// draw
		for (int i=0; i<cloud.width; i++){
			for (int j=0; j<cloud.height; j++){
				for (int k=0; k<cloud.depth; k++){
					if (cloud.isCenter(i,j,k)) continue;
					if (grid[i,j,k] != null || Random.value < cloud.pCubi){
						matrix[i,j,k] = drawCubi(i,j,k,grid);
					}
				}
			}
		}
	}
}
