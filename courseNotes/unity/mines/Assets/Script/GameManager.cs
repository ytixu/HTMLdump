using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour {

	public Cubi cubi;
	public Player player;
	public CubiCloud cloud;
	public Selector selector;
	public Material[] tileColor;

	public static int ItemNumb = 12;
	
	private Cubi[,,] matrix;

	// Use this for initialization
	void Start () {

	}

	// check if a position is bounded withing the cubicloud
	private bool inBound(Player.Position p){
		return inBound (p.i, p.j, p.k);
	}

	private bool inBound(int i, int j, int k){
		if (i > -1 && i < cloud.width && j > -1 && j < cloud.height &&
		    k > -1 && k < cloud.depth){
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

	// check if player can move to that direction
	public bool canMove(int direction){
		Player.Position p = player.getNextStep (direction);
		if (getCubi(p) == null){
			player.newLocation(p);
			return true;
		}
		return false;
	}
	
	// Update is called once per frame
	void Update () {
		//if (Input.GetKeyDown(KeyCode.Tab)){
			// TODO : toggle selector?
		//}
	}

	// drawing the cubis

	private Cubi drawCubi(int i, int j, int k, CubiCloud.cellValue[,,] grid){
		Cubi temp = GameObject.Instantiate(cubi) as Cubi;
		temp.name = i + "_" + j + "_" + k;
		temp.transform.parent = cloud.transform;
		temp.transform.localScale = new Vector3 (cloud.cubiSize, cloud.cubiSize, cloud.cubiSize);
		temp.newLocation(i,j,k,cloud.cubiSize);
		if (grid[i,j,k] != null){
			temp.Value = grid [i, j, k].val;
			temp.Bomb = grid [i, j, k].isBomb;
		}
		temp.x = i;
		temp.y = j;
		temp.z = k;
		if (temp.Value < ItemNumb){
			temp.renderer.material = tileColor [temp.Value];
			temp.ID = temp.Value;
		}else{
			temp.renderer.material = tileColor [ItemNumb-1];
			temp.ID = ItemNumb-1;
		}
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

	public void moveSelector(Cubi c){
		selector.showInCubi (c);
	}

	/**
	 * Handeling sweeping
	 */

	private void blowup(int a, int b, int c, Vector3 v){
		for (int i = -cloud.radius; i <= cloud.radius; i++){
			for (int j = -cloud.radius; j <= cloud.radius; j++){
				for (int k = -cloud.radius; k <= cloud.radius; k++){
					if (i == 0 && j == 0 && k==0) continue;
					int x = i + a;
					int y = j + b;
					int z = k + c;
					print (i+" " + j+ " " +k +" nei");
					if (inBound(x,y,z) && matrix[x,y,z] != null){
						matrix[x,y,z].move (v);
						matrix[x,y,z] = null;
					}
				}
			}
		}			
	}

	public void openCubi(Cubi c){
		player.inv.updateScore (c.score (), c.ID, player.displayer);
		if (c.Bomb){
			c.transform.localScale = Vector3.zero;
			print (c.x+" " + c.y+ " " +c.z + " BLOW");
			blowup(c.x, c.y, c.z, c.transform.position);
		}
		Destroy (c);
		Destroy (c.gameObject);
	}
}
