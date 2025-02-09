var WHITE; //show the current waitingroom
var YELLOW;
var BLUE;
var GREEN; 
var RED;
var ORANGE;

var cubit = [];
var cubeLength = 200;
var waitingroom = "";
var isRotating = false;
var algorithm = "";

var rotation_Angle = -20;
var height_Angle = -25;
var scalefact = 1;

//displays which axis is rotating, and which level
var Xrot = 2,
    Yrot = 2,
    Zrot = 2;
var rotDirection = 1;
var turnSpeed = 100;
var LastRotationTime;
var currentedgedec = "e";
var currentcornerdec = "e";

var currentedgesign = 1;
var currentcornersign = 1;

var edgetag = [];
var cornertag = [];

var SpeedSlider;
var scrambleButton;
var solveButton;
var autopilot;
var showconf;

var winwidth = 700;

var mystr1= "";
var mystr2 = "";


function setup() {
    createCanvas(winwidth, winwidth, WEBGL);

    WHITE = createVector(255, 255, 255);
    YELLOW = createVector(255, 255, 0);
    BLUE = createVector(0, 0, 255);
    GREEN = createVector(0, 255, 0);
    RED = createVector(255, 0, 0);
    ORANGE = createVector(255, 128, 0);

    textFont(myFont);
    textSize(12)

    angleMode(DEGREES);


    LastRotationTime = millis();



    for (let i = 0; i < 24; i++) {
        edgetag.push(i);
        cornertag.push(i);
    }


    for (let i = 0; i < 3; i++)
        cubit[i] = [];

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            cubit[i][j] = [];

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            for (let k = 0; k < 3; k++)
                cubit[i][j][k] = new Colorset;

}

function Colorset() {

    this.right = BLUE;
    this.up = WHITE;
    this.front = RED;
    this.left = GREEN;
    this.down = YELLOW;
    this.back = ORANGE;

    var l = cubeLength / 6 - 0.5;

    this.show = function (i, j, k) {


        noStroke();

        if (i === 1)
            fill(this.right.x, this.right.y, this.right.z);
        else
            fill(0);
        quad(l, l, l, l, -l, l, l, -l, -l, l, l, -l);

        if (i === -1)
            fill(this.left.x, this.left.y, this.left.z);
        else
            fill(0);
        quad(-l, l, l, -l, -l, l, -l, -l, -l, -l, l, -l);

        if (j === -1)
            fill(this.down.x, this.down.y, this.down.z);
        else
            fill(0);
        quad(l, l, l, -l, l, l, -l, l, -l, l, l, -l);

        if (j === 1)
            fill(this.up.x, this.up.y, this.up.z);
        else
            fill(0);
        quad(l, -l, l, -l, -l, l, -l, -l, -l, l, -l, -l);

        if (k === 1)
            fill(this.front.x, this.front.y, this.front.z);
        else
            fill(0);
        quad(l, l, l, -l, l, l, -l, -l, l, l, -l, l, );

        if (k === -1)
            fill(this.back.x, this.back.y, this.back.z);
        else
            fill(0);
        quad(l, l, -l, -l, l, -l, -l, -l, -l, l, -l, -l, );

    }


}

function keyPressed() {
    if(key==' ')
        {

            mystr1+=currentcornerdec +" & "+currentcornersign+" & "+currentedgedec+" & "+currentedgesign+"\\\\ \\hline";
                        var str5 = "(";
            var edgesum = 0;
            for (let i = 0; i < 24; i += 2) {
                edgesum += edgetag[i] % 2;
                str5 += str(edgetag[i] % 2);
                if (i < 22)
                    str5 += ",";
            }

            str5 += ")";
         mystr2+=str5+" & "+str(edgesum)+" & ";
            
         
                     var str6 = "(";

            var cornersum = 0;
            for (let i = 0; i < 24; i += 3) {
                cornersum += cornertag[i] % 3;
                str6 += str(cornertag[i] % 3);
                if (i < 21)
                    str6 += ",";
            }
            str6 += ")";
         mystr2+=str6+" & "+str(cornersum);
            mystr2+="\\\\ \\hline"
        }
    
    if (key.toUpperCase() == 'R' || key.toUpperCase() == 'F' || key.toUpperCase() == 'U' || key.toUpperCase() == 'B' || key.toUpperCase() == 'D' || key.toUpperCase() == 'L' || key.toUpperCase() == 'X' || key.toUpperCase() == 'Y' || key.toUpperCase() == 'Z' || key.toUpperCase() == 'M' || key.toUpperCase() == 'E' || key.toUpperCase() == 'S') {
        waitingroom += key;
    }
}

function Rotate(move, dir) {
    if (move != ' ')
        if (move.toLowerCase() == move) {
            Rotate(move.toUpperCase(), -1);
            return;
        }

    switch (move) {
        case 'R':
            //rotation of edges
            cycle4(2, 11, 18, 13, edgetag, dir);
            cycle4(3, 10, 19, 12, edgetag, dir);

            cycle4(3, 17, 18, 8, cornertag, dir);
            cycle4(4, 15, 19, 6, cornertag, dir);
            cycle4(7, 5, 16, 20, cornertag, dir);
            if (dir != 0)
                rotatecase('X', 2, dir);
            break;

        case 'U':

            cycle4(0, 2, 4, 6, edgetag, dir);
            cycle4(1, 3, 5, 7, edgetag, dir);

            cycle4(0, 3, 6, 9, cornertag, dir);
            cycle4(1, 4, 7, 10, cornertag, dir);
            cycle4(2, 5, 8, 11, cornertag, dir);
            if (dir != 0)
                rotatecase('Y', 2, dir);
            break;

        case 'F':

            cycle4(4, 12, 20, 14, edgetag, dir);
            cycle4(5, 13, 21, 15, edgetag, dir);

            cycle4(10, 8, 19, 23, cornertag, dir);
            cycle4(9, 7, 18, 22, cornertag, dir);
            cycle4(6, 20, 21, 11, cornertag, dir);
            if (dir != 0)
                rotatecase('Z', 2, dir);
            break;

        case 'L':

            cycle4(6, 15, 22, 9, edgetag, dir);
            cycle4(7, 14, 23, 8, edgetag, dir);

            cycle4(1, 11, 22, 14, cornertag, dir);
            cycle4(0, 10, 21, 13, cornertag, dir);
            cycle4(9, 23, 12, 2, cornertag, dir);
            if (dir != 0)
                rotatecase('X', 0, -dir);
            break;

        case 'D':

            cycle4(21, 19, 17, 23, edgetag, dir);
            cycle4(20, 18, 16, 22, edgetag, dir);

            cycle4(21, 18, 15, 12, cornertag, dir);
            cycle4(23, 20, 17, 14, cornertag, dir);
            cycle4(22, 19, 16, 13, cornertag, dir);
            if (dir != 0)
                rotatecase('Y', 0, -dir);
            break;

        case 'B':

            cycle4(0, 8, 16, 10, edgetag, dir);
            cycle4(1, 9, 17, 11, edgetag, dir);

            cycle4(4, 2, 13, 17, cornertag, dir);
            cycle4(3, 1, 12, 16, cornertag, dir);
            cycle4(0, 14, 15, 5, cornertag, dir);
            if (dir != 0)
                rotatecase('Z', 0, -dir);
            break;

        case 'X':
            changeCrossOrigin(edgeXfacet, cornerXfacet, dir);
            if (dir != 0)
                rotatecase('X', 4, dir);

            break;

        case 'Y':
            changeCrossOrigin(edgeYfacet, cornerYfacet, dir);
            if (dir != 0)
                rotatecase('Y', 4, dir);
            break;

        case 'Z':
            changeCrossOrigin(edgeZfacet, cornerZfacet, dir);
            if (dir != 0)
                rotatecase('Z', 4, dir);
            break;

        case 'M':
            if (dir == -1) {
                Rotate('M', 0);
                Rotate('M', 0);
            }
            Rotate('X', 0);
            Rotate('X', 0);
            Rotate('X', 0);
            Rotate('R', 0);
            Rotate('L', 0);
            Rotate('L', 0);
            Rotate('L', 0);
            if (dir != 0)
                rotatecase('X', 1, -dir);

            break;

        case 'E':
            if (dir == -1) {
                Rotate('E', 0);
                Rotate('E', 0);
            }
            Rotate('Y', 0);
            Rotate('Y', 0);
            Rotate('Y', 0);
            Rotate('U', 0);
            Rotate('D', 0);
            Rotate('D', 0);
            Rotate('D', 0);
            if (dir != 0)
                rotatecase('Y', 1, -dir);
            break;

        case 'S':
            if (dir == -1) {
                Rotate('S', 0);
                Rotate('S', 0);
            }
            Rotate('Z', 0);
            Rotate('B', 0);
            Rotate('F', 0);
            Rotate('F', 0);
            Rotate('F', 0);
            if (dir != 0)
                rotatecase('Z', 1, dir);
            break;

        default:
            break;
    }
    currentedgedec = cycledecomposition(edgetag, 12);
    currentcornerdec = cycledecomposition(cornertag, 8);

}

function rotatecase(dim, level, direction) {
    if (level == 4) {
        rotatecase(dim, 0, direction);
        rotatecase(dim, 1, direction);
        rotatecase(dim, 2, direction);
        if (dim == 'X')
            Xrot = 4; //means all
        else if (dim == 'Y')
            Yrot = 4;
        else
            Zrot = 4;
        return;
    }

    if (direction == -1) {
        for (let i = 0; i < 2; i++)
            rotatecase(dim, level, 1);
        rotDirection = -1;
    } else
        rotDirection = 1;


    var TEMP = []
    for (let i = 0; i < 3; i++)
        TEMP[i] = []

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            TEMP[i][j] = new Colorset;

    switch (dim) {
        case 'X':
            Xrot = level - 1;

            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++)
                    TEMP[i][j] = cubit[level][i][j];
            rotatematrix(TEMP);
            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++)
                    cubit[level][i][j] = TEMP[i][j];

            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++) {
                    var qb = cubit[level][i][j];
                    var temp = qb.front; //turn cell independantly
                    qb.front = qb.down;
                    qb.down = qb.back;
                    qb.back = qb.up;
                    qb.up = temp;
                    cubit[level][i][j] = qb;
                }
            break;

        case 'Y':
            Yrot = level - 1;
            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++)
                    TEMP[j][i] = cubit[i][level][j];
            rotatematrix(TEMP);
            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++)
                    cubit[i][level][j] = TEMP[j][i];

            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++) {
                    var qb = cubit[i][level][j];
                    var temp = qb.front;
                    qb.front = qb.right;
                    qb.right = qb.back;
                    qb.back = qb.left;
                    qb.left = temp;
                    cubit[i][level][j] = qb;
                }
            break;

        case 'Z':
            Zrot = level - 1;
            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++)
                    TEMP[i][j] = cubit[i][j][level];
            rotatematrix(TEMP);
            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++)
                    cubit[i][j][level] = TEMP[i][j];
            for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++) {
                    var qb = cubit[i][j][level];
                    var temp = qb.up;
                    qb.up = qb.left;
                    qb.left = qb.down;
                    qb.down = qb.right;
                    qb.right = temp;
                    cubit[i][j][level] = qb;
                }
            break;
    }
}

function cycle4(a, b, c, d, arr, dir) {
    if (dir == -1) {
        cycle4(a, b, c, d, arr, 1);
        cycle4(a, b, c, d, arr, 1);
    }

    let temp = arr[d];
    arr[d] = arr[c];
    arr[c] = arr[b];
    arr[b] = arr[a];
    arr[a] = temp;
}

function changeCrossOrigin(edgefunc, cornerfunc, dir) {
    if (dir == -1) {
        changeCrossOrigin(edgefunc, cornerfunc, 1);
        changeCrossOrigin(edgefunc, cornerfunc, 1);
    }
    var tempE = [];
    var tempC = [];

    for (let i = 0; i < 24; i++) {
        tempE.push(0);
        tempC.push(0);
    }

    //edges first, for no particular reason
    for (let i = 0; i < 24; i++) //24 edges to change the value
    {
        tempE[edgefunc(i)] = edgefunc(edgetag[i]);
    }
    for (let i = 0; i < 24; i++)
        edgetag[i] = tempE[i];

    //then the corners
    for (let i = 0; i < 24; i++) {
        tempC[cornerfunc(i)] = cornerfunc(cornertag[i]);
    }
    for (let i = 0; i < 24; i++)
        cornertag[i] = tempC[i];
}

function cycledecomposition(permutation, arrlength) {

    var cd = "";

    var scal = 24 / arrlength;
    var parity = 0;
    var realperm = [];
    var done = false;
    for (let i = 0; i < arrlength; i++)
        realperm.push(floor(permutation[scal * i] / scal));

    var perm = [];
    for (let i = 0; i < arrlength; i++)
        perm.push(i);
    //go through each element in the vector
    while (1) {
        var i;
        done = false;
        for (let k = 0; k < arrlength; k++)
            if (perm[k] != -1) {
                i = k;
                done = true;
                break;
            }
        if (!done)
            break;
        //it its image is himself, go to the next (no 1-cycle)
        if (realperm[i] == i) {
            perm[i] = -1;
            continue;
        } else { //we go here on a cycle
            let start = i;
            cd += "(";
            while (1) {
                cd += str(i + 1);
                parity++;
                perm[i] = -1;
                for (let j = 0; j < arrlength; j++)
                    if (realperm[j] == i) {
                        i = j;
                        break;
                    }
                if (i == start) {
                    cd += ") ";0
                    parity--;
                    break;
                } else
                    cd += " ";
            }
        }
        //check if all done


    }

    if (cd.length == 0)
        cd += "e";

    if (parity % 2 == 0) {
        if (arrlength == 12) //means edge perm
            currentedgesign = 1;
        else
            currentcornersign = 1;
    } else {
        if (arrlength == 12)
            currentedgesign = -1;
        else
            currentcornersign = -1;
    }

    return cd;

}

function draw() {

    if (keyIsDown(LEFT_ARROW))
        rotation_Angle += 90 / frameRate();
    if (keyIsDown(RIGHT_ARROW))
        rotation_Angle -= 90 / frameRate();
    if (keyIsDown(DOWN_ARROW))
        height_Angle += 90 / frameRate();
    if (keyIsDown(UP_ARROW))
        height_Angle -= 90 / frameRate();
    if (keyIsDown(107)) //deprecated
        scalefact += 1 / frameRate();
    if (keyIsDown(109))
        scalefact -= 1 / frameRate();
    scalefact = constrain(scalefact, 0.1, 2);
    height_Angle = constrain(height_Angle, -70, 70);



    background(200);



    scale(scalefact);
    rotateX(height_Angle);
    rotateY(rotation_Angle);

    if (waitingroom.length > 0 && !isRotating) {
        Rotate(waitingroom[0], 1);
        waitingroom = waitingroom.substr(1);
        isRotating = true;
        LastRotationTime = millis();
    }


    var l = cubeLength / 3;
    //draw all 27 cubits
    for (let i = -1; i < 2; i++)
        for (let j = -1; j < 2; j++)
            for (let k = -1; k < 2; k++) {
                push();

                if (Xrot == i || Xrot == 4)
                    rotateX(-rotDirection * (90 - 90 * (millis() - LastRotationTime) / turnSpeed));
                if (Yrot == j || Yrot == 4)
                    rotateY(rotDirection * (90 - 90 * (millis() - LastRotationTime) / turnSpeed));
                if (Zrot == k || Zrot == 4)
                    rotateZ(-rotDirection * (90 - 90 * (millis() - LastRotationTime) / turnSpeed));

                


                translate(l * i, -l * j, l * k);
                cubit[i + 1][j + 1][k + 1].show(i, j, k);
                text(`${i},${j},${k}`, 0, 0);  // Display the text at the translated position
                pop();
            }



    if ((millis() - LastRotationTime) >= turnSpeed && (Xrot != 2 || Yrot != 2 || Zrot != 2)) {
        Xrot = 2;
        Yrot = 2;
        Zrot = 2;
        isRotating = false;
    }





}

function rotatematrix(matrix) {
    var nums = [];
    nums.push(matrix[0][0], matrix[0][1], matrix[0][2], matrix[1][2], matrix[2][2], matrix[2][1], matrix[2][0], matrix[1][0]);
    for (let i = 0; i < 6; i++)
        nums.push(nums.shift());
    matrix[0][0] = nums[0];
    matrix[0][1] = nums[1];
    matrix[0][2] = nums[2];
    matrix[1][2] = nums[3];
    matrix[2][2] = nums[4];
    matrix[2][1] = nums[5];
    matrix[2][0] = nums[6];
    matrix[1][0] = nums[7];

}

function processmoves(algo) {
    waitingroom += algo;
}

function scramble(movenum) {
    randomSeed(millis());
    if (movenum == undefined)
        movenum = 20;

    var rot = [];
    rot.push('R', 'U', 'F', 'L', 'D', 'B','M','E','S')

    var scrb = "";
    for (let i = 0; i < movenum; i++) {
        var move = random(rot);
        if (random(2) < 1)
            scrb += move.toLowerCase();
        else
            scrb += move;
    }

    processmoves(cleanalg(scrb));
    scrb="";

}

function edgeXfacet(num) {
    switch (num) {
        case 0:
            return 17;
        case 1:
            return 16;
        case 2:
            return 11;
        case 3:
            return 10;
        case 4:
            return 1;
        case 5:
            return 0;
        case 6:
            return 9;
        case 7:
            return 8;
        case 8:
            return 23;
        case 9:
            return 22;
        case 10:
            return 19;
        case 11:
            return 18;
        case 12:
            return 3;
        case 13:
            return 2;
        case 14:
            return 7;
        case 15:
            return 6;
        case 16:
            return 21;
        case 17:
            return 20;
        case 18:
            return 13;
        case 19:
            return 12;
        case 20:
            return 5;
        case 21:
            return 4;
        case 22:
            return 15;
        case 23:
            return 14;
    }
    return -1;
}

function edgeYfacet(num) {
    switch (num) {
        case 0:
            return 2;
        case 1:
            return 3;
        case 2:
            return 4;
        case 3:
            return 5;
        case 4:
            return 6;
        case 5:
            return 7;
        case 6:
            return 0;
        case 7:
            return 1;
        case 8:
            return 11;
        case 9:
            return 10;
        case 10:
            return 13;
        case 11:
            return 12;
        case 12:
            return 15;
        case 13:
            return 14;
        case 14:
            return 9;
        case 15:
            return 8;
        case 16:
            return 18;
        case 17:
            return 19;
        case 18:
            return 20;
        case 19:
            return 21;
        case 20:
            return 22;
        case 21:
            return 23;
        case 22:
            return 16;
        case 23:
            return 17;
    }
    return -1;
}

function edgeZfacet(num) {
    switch (num) {
        case 0:
            return 10;
        case 1:
            return 11;
        case 2:
            return 19;
        case 3:
            return 18;
        case 4:
            return 12;
        case 5:
            return 13;
        case 6:
            return 3;
        case 7:
            return 2;
        case 8:
            return 0;
        case 9:
            return 1;
        case 10:
            return 16;
        case 11:
            return 17;
        case 12:
            return 20;
        case 13:
            return 21;
        case 14:
            return 4;
        case 15:
            return 5;
        case 16:
            return 8;
        case 17:
            return 9;
        case 18:
            return 23;
        case 19:
            return 22;
        case 20:
            return 14;
        case 21:
            return 15;
        case 22:
            return 7;
        case 23:
            return 6;
    }
    return -1;
}

function cornerXfacet(num) {
    switch (num) {
        case 0:
            return 13;
        case 1:
            return 14;
        case 2:
            return 12;
        case 3:
            return 17;
        case 4:
            return 15;
        case 5:
            return 16;
        case 6:
            return 4;
        case 7:
            return 5;
        case 8:
            return 3;
        case 9:
            return 2;
        case 10:
            return 0;
        case 11:
            return 1;
        case 12:
            return 23;
        case 13:
            return 21;
        case 14:
            return 22;
        case 15:
            return 19;
        case 16:
            return 20;
        case 17:
            return 18;
        case 18:
            return 8;
        case 19:
            return 6;
        case 20:
            return 7;
        case 21:
            return 10;
        case 22:
            return 11;
        case 23:
            return 9;
    }
    return -1;
}

function cornerYfacet(num) {
    switch (num) {
        case 0:
            return 3;
        case 1:
            return 4;
        case 2:
            return 5;
        case 3:
            return 6;
        case 4:
            return 7;
        case 5:
            return 8;
        case 6:
            return 9;
        case 7:
            return 10;
        case 8:
            return 11;
        case 9:
            return 0;
        case 10:
            return 1;
        case 11:
            return 2;
        case 12:
            return 15;
        case 13:
            return 16;
        case 14:
            return 17;
        case 15:
            return 18;
        case 16:
            return 19;
        case 17:
            return 20;
        case 18:
            return 21;
        case 19:
            return 22;
        case 20:
            return 23;
        case 21:
            return 12;
        case 22:
            return 13;
        case 23:
            return 14;
    }
    return -1;
}

function cornerZfacet(num) {
    switch (num) {
        case 0:
            return 5;
        case 1:
            return 3;
        case 2:
            return 4;
        case 3:
            return 16;
        case 4:
            return 17;
        case 5:
            return 15;
        case 6:
            return 20;
        case 7:
            return 18;
        case 8:
            return 19;
        case 9:
            return 7;
        case 10:
            return 8;
        case 11:
            return 6;
        case 12:
            return 1;
        case 13:
            return 2;
        case 14:
            return 0;
        case 15:
            return 14;
        case 16:
            return 12;
        case 17:
            return 13;
        case 18:
            return 22;
        case 19:
            return 23;
        case 20:
            return 21;
        case 21:
            return 11;
        case 22:
            return 9;
        case 23:
            return 10;
    }
    return -1;
}

function cleanalg(algo) {

    var ischanged;
    do {
        var cleanwr = "";
        ischanged = false;
        //console.log(algo);


        for (let i = 0; i < algo.length; i++) {



            if (i + 3 < algo.length && algo[i] == algo[i + 1] && algo[i + 1] == algo[i + 2] && algo[i + 2] == algo[i + 3]) {
                i += 3;
                ischanged = true;
                continue;
            }

            if (i + 2 < algo.length) //the 2 after exist
                if (algo[i] == algo[i + 1] && algo[i + 1] == algo[i + 2]) {
                    cleanwr += oppcase(algo[i]);
                    i += 2;
                    ischanged = true;
                    continue;
                }


            if (i + 1 < algo.length)
                if (algo[i] == oppcase(algo[i + 1])) {
                    i++;
                    ischanged = true;
                    continue;
                } //just skip one

            if (i + 2 < algo.length)
                if (movedim(algo[i]) == movedim(algo[i + 1]) && movedim(algo[i]) == movedim(algo[i + 2])) { //in this case I have 3 moves of the same dimension in a row => check if more
                    var dim = movedim(algo[i]);
                    var copyi = i;




                    var sortedmoves = [];

                    while (algo[copyi] != undefined && movedim(algo[copyi]) == dim) {
                        sortedmoves.push(algo[copyi]);
                        copyi++;
                    }
                    copyi -= i;
                    //I have copyi of the same dimension, I want to organize them, here by char order
                    var copymove = JSON.parse(JSON.stringify(sortedmoves));

                    sortedmoves.sort(sortletters)

                    var getout = false;
                    for (k = 0; k < sortedmoves.length; k++)
                        if (copymove[k] != sortedmoves[k]) {
                            getout = true;
                        }
                    if (!getout) {
                        cleanwr += algo[i];
                        continue;
                    }
                    // console.log(sortedmoves);

                    var to_add = "";

                    for (let j = 0; j < copyi; j++)
                        to_add += sortedmoves[j];


                    algo = algo.slice(0, i) + to_add + algo.slice(i + copyi, algo.length);


                    ischanged = true;
                    i--;
                    continue; //I want to make changes on these before adding them to the wr 
                }



            cleanwr += algo[i];
        }
        algo = cleanwr;

    } while (ischanged)

    for (let i = 0; i < algo.length; i++) //I remove every X,Y and Z by changing the moves after it
    {
        var str = "";
        switch(algo[i]){
            case 'X':
            //I start a new string that start after this
            
            for (let j = 1; j < algo.length - i; j++) {
                str += replaceX(algo[i+j]);
            }
            
            algo = algo.slice(0,i) + str;
            i--;
            break;
                
            case 'x':
            for (let j = 1; j < algo.length - i; j++) {
                str += replaceX(replaceX(replaceX(algo[i+j])));
            }
            
            algo = algo.slice(0,i) + str;
            i--;
            break;
                
            case 'Y':
            //I start a new string that start after this
            
            for (let j = 1; j < algo.length - i; j++) {
                str += replaceY(algo[i+j]);
            }
            
            algo = algo.slice(0,i) + str;
            i--;
            break;
                
            case 'y':
            for (let j = 1; j < algo.length - i; j++) {
                str += replaceY(replaceY(replaceY(algo[i+j])));
            }
            
            algo = algo.slice(0,i) + str;
            i--;
            break;
                
            case 'Z':
            //I start a new string that start after this
            
            for (let j = 1; j < algo.length - i; j++) {
                str += replaceZ(algo[i+j]);
            }
            
            algo = algo.slice(0,i) + str;
            i--;
            break;
                
            case 'z':
            for (let j = 1; j < algo.length - i; j++) {
                str += replaceZ(replaceZ(replaceZ(algo[i+j])));
            }
            
            algo = algo.slice(0,i) + str;
            i--;
            break;


        }
    }


    return algo;
}

function replaceX(move) {
    
    var ans;
    
    switch (move.toUpperCase()) {
        case 'R':
            ans= 'R';   break;
        case 'L':
            ans= 'L';   break;
        case 'U':
            ans= 'F';   break;
        case 'F':
            ans= 'D';   break;
        case 'D':
            ans= 'B';   break;
        case 'B':
            ans= 'U';   break;
        case 'M':
            ans= 'M';   break;
        case 'E':
            ans= 's';   break;
        case 'S':
            ans= 'E';   break;
        case 'X':
            ans= 'X';   break;
        case 'Y':
            ans='Z';    break;
        case 'Z':
            ans='y';    break;
        default:
            console.log("problem with move"+move);
            
    }
    
    if(move.toLowerCase()==move)
        return oppcase(ans);
    
    return ans;
}

function replaceY(move) {
    
    var ans;
    
    switch (move.toUpperCase()) {
        case 'R':
            ans= 'B';   break;
        case 'L':
            ans= 'F';   break;
        case 'U':
            ans= 'U';   break;
        case 'F':
            ans= 'R';   break;
        case 'D':
            ans= 'D';   break;
        case 'B':
            ans= 'L';   break;
        case 'M':
            ans= 'S';   break;
        case 'E':
            ans= 'E';   break;
        case 'S':
            ans= 'm';   break;
        case 'X':
            ans= 'z';   break;
        case 'Y':
            ans= 'Y';    break;
        case 'Z':
            ans= 'X';    break;
        default:
            console.log("problem with move"+move);
            
    }
    
    if(move.toLowerCase()==move)
        return oppcase(ans);
    
    return ans;
}

function replaceZ(move) {
    
    var ans;
    
    switch (move.toUpperCase()) {
        case 'R':
            ans= 'U';   break;
        case 'L':
            ans= 'D';   break;
        case 'U':
            ans= 'L';   break;
        case 'F':
            ans= 'F';   break;
        case 'D':
            ans= 'R';   break;
        case 'B':
            ans= 'B';   break;
        case 'M':
            ans= 'E';   break;
        case 'E':
            ans= 'm';   break;
        case 'S':
            ans= 'S';   break;
        case 'X':
            ans= 'Y';   break;
        case 'Y':
            ans= 'x';    break;
        case 'Z':
            ans= 'Z';    break;
        default:
            console.log("problem with move"+move);
            
    }
    
    if(move.toLowerCase()==move)
        return oppcase(ans);
    
    return ans;
}

function sortletters(a, b) {
    if(a.toUpperCase()==b.toUpperCase())
        return 0;
    
    if (unchar(a.toUpperCase()) - unchar(b.toUpperCase()) > 0)
        return 1;
    else
        return -1;
}

function oppcase(c) {
    if (c.toLowerCase() == c)
        return c.toUpperCase();
    else
        return c.toLowerCase();
}

function alg(algo) {
    algorithm += algo;

    for (let i = 0; i < algo.length; i++)
        Rotate(algo[i], 1);
}

function processSolve() { 
    
    algorithm = "";
    algorithm += waitingroom;

    const tempx = Xrot,
        tempy = Yrot,
        tempz = Zrot,
        temprot = rotDirection
    //empty the waitingroom first
    while (waitingroom.length > 0) {
        Rotate(waitingroom[0], 1);
        waitingroom = waitingroom.substr(1);
    }

    solveWhiteCross();
    solvef2l();
    solveoll();
    solvepll();

    if (!isSolved()) {
        console.log("  problem..");

    }

    
    
waitingroom += cleanalg(algorithm);

    for (let i = algorithm.length - 1; i >= 0; i--)
        Rotate(oppcase(algorithm[i]), 1);


    

    Xrot = tempx;
    Yrot = tempy;
    Zrot = tempz;
    rotDirection = temprot;

}

function solveWhiteCross() {
    //step 1. orientate white up
    if (!(cubit[1][2][1].up == WHITE)) {
        if (cubit[1][0][1].down == WHITE) {
            alg("XX");
        } else {
            for (let i = 0; i < 4; i++) //maximum four times-->security
            {
                if (cubit[1][1][2].front == WHITE) {
                    alg("X");
                    break;
                }
                alg("Y");
            }
        }
    }
    //find white piece (aretes) --> to simplify the work I want to put all of them on the yellow face
    //check on white face --> put it down(but before check the is no white underneath, if yes move it)
    //check on side faces --> if one: first clean the place underneath,then rotate it to right place, then Dr (move down and put piece underneath)
    while (1) //as long as there miss one
    {
        while (cubit[1][2][2].front == WHITE || cubit[0][1][2].front == WHITE || cubit[1][0][2].front == WHITE || cubit[2][1][2].front == WHITE) //do it while there is a white piece there
        {
            while (cubit[1][0][2].down == WHITE) //clean underneath to do F// or the piece is white on our side, so i dont want to 'D' it
                alg("D");
            while (!(cubit[2][1][2].front == WHITE)) //put the white on right
                alg("F");
            if (cubit[2][0][1].down == WHITE)
                alg("D"); //move the clean place to the right, then put the white on it
            alg("r");
        }
        var counter = 0; //way out

        if (cubit[1][0][0].down == WHITE) counter++;
        if (cubit[0][0][1].down == WHITE) counter++;
        if (cubit[2][0][1].down == WHITE) counter++;
        if (cubit[1][0][2].down == WHITE) counter++;
        if (cubit[1][2][0].up == WHITE) counter++;
        if (cubit[0][2][1].up == WHITE) counter++;
        if (cubit[2][2][1].up == WHITE) counter++;
        if (cubit[1][2][2].up == WHITE) counter++;
        if (counter == 4)
            break;

        alg("Y");
    }

    while (!(cubit[1][0][0].down == WHITE && cubit[0][0][1].down == WHITE && cubit[2][0][1].down == WHITE && cubit[1][0][2].down == WHITE)) //while there are not all down
    {
        if (cubit[1][2][2].up == WHITE) {
            //check if underneath is clear
            while (cubit[1][0][2].down == WHITE)
                alg("D");
            alg("FF");
        } else
            alg("Y");
    }

    //make them all go up on the correct place --> for all 4 side faces(Y to change), check if color is correct, if yes FF, D until it's the right one
    for (let i = 0; i < 4; i++) {
        while (!(cubit[1][0][2].down == WHITE && cubit[1][0][2].front == cubit[1][1][2].front))
            alg("D");
        alg("FF");
        if (i == 3)
            break; //dont need to do the final turn
        alg("Y");
    }
    alg("XX"); //turn white face down

}

function solvef2l() {
    for (let i = 0; i < 4; i++) //every corner, locate the right piece and the other
    {
        var FCOLOR = cubit[1][1][2].front,
            RCOLOR = cubit[2][1][1].right;

        var cornercase = 0;
        // 1 to 6: 1-2-3: up, facing upward, rightward, frontward, same for 4-5-6 but down
        var edgecase = 0;
        // 1 to 10: right-back-left-front (1-2 is fcolor upward, fcolor outward),... then 9-10 is middle(correct,inverted)

        //first check rightfrontdown cubit
        if (cubit[2][0][2].down == WHITE && cubit[2][0][2].front == FCOLOR && cubit[2][0][2].right == RCOLOR)
            cornercase = 4; //white downward
        else if (cubit[2][0][2].right == WHITE && cubit[2][0][2].down == FCOLOR && cubit[2][0][2].front == RCOLOR)
            cornercase = 5; //white rightward
        else if (cubit[2][0][2].front == WHITE && cubit[2][0][2].right == FCOLOR && cubit[2][0][2].down == RCOLOR)
            cornercase = 6; //white frontward
        else {
            for (let j = 0; j < 4; j++) //then top face
            {
                if (cubit[2][2][2].up == WHITE && cubit[2][2][2].right == FCOLOR && cubit[2][2][2].front == RCOLOR) //white upward
                {
                    cornercase = 1;
                    for (let k = 0; k < j; k++) //rotate it to the front
                        alg("U");
                } else if (cubit[2][2][2].right == WHITE && cubit[2][2][2].front == FCOLOR && cubit[2][2][2].up == RCOLOR) //white rightward
                {
                    cornercase = 2;
                    for (let k = 0; k < j; k++) //rotate it to the front
                        alg("U");
                } else if (cubit[2][2][2].front == WHITE && cubit[2][2][2].up == FCOLOR && cubit[2][2][2].right == RCOLOR) //white frontward
                {
                    cornercase = 3;
                    for (let k = 0; k < j; k++) //rotate it to the front
                        alg("U");
                }

                //now check if the corner is hidden in other downcorners
                else if (j == 0) //if its 0 that means I am at the current corner so i skip
                {
                    /*do nothing, i just avoid doing the nexts*/
                } else if (cubit[2][0][2].down == WHITE && cubit[2][0][2].front == FCOLOR && cubit[2][0][2].right == RCOLOR) {
                    alg("RUr");
                    for (let k = 0; k < j - 1; k++) //rotate it to the front
                        alg("U");
                    cornercase = 3;
                } else if (cubit[2][0][2].front == WHITE && cubit[2][0][2].right == FCOLOR && cubit[2][0][2].down == RCOLOR) {
                    alg("RUr");
                    for (let k = 0; k < j - 1; k++) //rotate it to the front
                        alg("U");
                    cornercase = 1;
                } else if (cubit[2][0][2].right == WHITE && cubit[2][0][2].down == FCOLOR && cubit[2][0][2].front == RCOLOR) {
                    alg("RUr");
                    for (let k = 0; k < j - 1; k++) //rotate it to the front
                        alg("U");
                    cornercase = 2;
                }
                alg("Y"); //in any case turn a whole 360 degrees
            }
        }
        //alg("Y");
        //cout<<"cornercase : "<<cornercase<<endl;


        //now I want to find the edgecase
        if (cubit[2][1][2].front == FCOLOR && cubit[2][1][2].right == RCOLOR)
            edgecase = 9;
        else if (cubit[2][1][2].right == FCOLOR && cubit[2][1][2].front == RCOLOR)
            edgecase = 10;
        //now I will get all hidden edges out, then name them with edgecase
        else {
            alg("Y"); //i dont need to check the first onw, i already did it
            for (let j = 1; j < 4; j++) {
                if ((cubit[2][1][2].front == FCOLOR && cubit[2][1][2].right == RCOLOR) || (cubit[2][1][2].right == FCOLOR && cubit[2][1][2].front == RCOLOR)) {
                    if (j == 1) {
                        alg("RUru");
                    }
                    if (j == 2) {
                        alg("RurU");
                    }
                    if (j == 3) {
                        alg("Rur");
                    }
                }
                alg("Y");
            }
            if (cornercase > 3 && edgecase == 0) //if corner on bottom and edge is on top(case==0, bc i still didnt name it), I put it in correct place (above the corresponding color)
            {
                while (!((cubit[2][2][1].right == RCOLOR && cubit[2][2][1].up == FCOLOR) || (cubit[1][2][2].front == FCOLOR && cubit[1][2][2].up == RCOLOR)))
                    alg("U");
            }
            //determining the edgecase: right-back-left-front (1-2 is fcolor upward, fcolor outward),...
            if (cubit[2][2][1].right == RCOLOR && cubit[2][2][1].up == FCOLOR)
                edgecase = 1;
            else if (cubit[2][2][1].up == RCOLOR && cubit[2][2][1].right == FCOLOR)
                edgecase = 2;
            else if (cubit[1][2][0].back == RCOLOR && cubit[1][2][0].up == FCOLOR)
                edgecase = 3;
            else if (cubit[1][2][0].up == RCOLOR && cubit[1][2][0].back == FCOLOR)
                edgecase = 4;
            else if (cubit[0][2][1].left == RCOLOR && cubit[0][2][1].up == FCOLOR)
                edgecase = 5;
            else if (cubit[0][2][1].up == RCOLOR && cubit[0][2][1].left == FCOLOR)
                edgecase = 6;
            else if (cubit[1][2][2].front == RCOLOR && cubit[1][2][2].up == FCOLOR)
                edgecase = 7;
            else if (cubit[1][2][2].up == RCOLOR && cubit[1][2][2].front == FCOLOR)
                edgecase = 8;
        }

        //I have all my info, now I apply the algorithms
        switch (cornercase) {
            case 1: //top facing upwards
                switch (edgecase) {
                    case 1:
                        alg("RUUruRUr");
                        break;
                    case 2:
                        alg("yruRUUruRUruRY");
                        break;
                    case 3:
                        alg("URUUrURur");
                        break;
                    case 4:
                        alg("UUfuFufUF");
                        break;
                    case 5:
                        alg("UURUrURur");
                        break;
                    case 6:
                        alg("ufUUFufUF");
                        break;
                    case 7:
                        alg("RUruuRUruRUr");
                        break;
                    case 8:
                        alg("fUUFUfuF");
                        break;

                    case 9:
                        alg("RUruRUruRUr");
                        break;
                    case 10:
                        alg("RurfUUF");
                        break;
                }
                break;
            case 2: //top facing rightwards
                switch (edgecase) {
                    case 1:
                        alg("uRurURUr");
                        break;
                    case 2:
                        alg("RurUyUruRY");
                        break;
                    case 3:
                        alg("RUr");
                        break;
                    case 4:
                        alg("UfUUFUfUUF");
                        break;
                    case 5:
                        alg("uRUrURUr");
                        break;
                    case 6:
                        alg("UfuFUfUUF");
                        break;
                    case 7:
                        alg("UfUUFuRUr");
                        break;
                    case 8:
                        alg("ufUF");
                        break;

                    case 9:
                        alg("UfUFUfUUF");
                        break;
                    case 10:
                        alg("UfuFYuFUfy");
                        break;
                }
                break;
            case 3: //top facing frontwards
                switch (edgecase) {
                    case 1:
                        alg("URur");
                        break;
                    case 2:
                        alg("uRUUrUfuF");
                        break;
                    case 3:
                        alg("uRUruRUUr");
                        break;
                    case 4:
                        alg("UfuFufuF");
                        break;
                    case 5:
                        alg("uRUUruRUUr");
                        break;
                    case 6:
                        alg("fuF");
                        break;
                    case 7:
                        alg("fUFuYuFUfy");
                        break;
                    case 8:
                        alg("UfUFufuF");
                        break;

                    case 9:
                        alg("uRuruRUUr");
                        break;
                    case 10:
                        alg("uRUryUruRY");
                        break;
                }
                break;
            case 4: //bottom facing downwards
                switch (edgecase) {
                    case 1:
                        alg("ufUFURur");
                        break;
                    case 8:
                        alg("URurufUF");
                        break;
                    case 10:
                        alg("RUrUURUUryUruRY");
                        break;
                }
                break;
            case 5: //bottom facing rightwards
                switch (edgecase) {
                    case 1:
                        alg("RUruRUr");
                        break;
                    case 8:
                        alg("fUFufUF");
                        break;
                    case 9:
                        alg("RurURUUrURur");
                        break;
                    case 10:
                        alg("RUruRurUyUruRY");
                        break;
                }
                break;
            case 6: //bottom facing frontwards
                switch (edgecase) {
                    case 1:
                        alg("RurURur");
                        break;
                    case 8:
                        alg("fuFUfuF");
                        break;
                    case 9:
                        alg("RuruRUruRUUr");
                        break;
                    case 10:
                        alg("RuryUruRuruRY");
                        break;
                }
                break;
        }

        if (!(cubit[2][0][2].down == WHITE && cubit[2][0][2].right == RCOLOR && cubit[2][0][2].front == FCOLOR && cubit[2][1][2].front == FCOLOR && cubit[2][1][2].right == RCOLOR)) {
            cout << "f2l problem: cornercase = " << cornercase << " and edgecase = " << edgecase << endl;
            cout << "algo = " << algorithm << endl;
            return;
        }
        alg("Y");

    }
}

function solveoll() {
    //I will do the checks then rotate (4 times), unless I find my case, so I dont miss it

    //an int corresponds to a certain case of the rotation of the corners/edges
    var edgecase = 0,
        cornercase = 0;

    //case 1: whole cross
    if (cubit[1][2][0].up == YELLOW && cubit[0][2][1].up == YELLOW && cubit[1][2][2].up == YELLOW && cubit[2][2][1].up == YELLOW)
        edgecase = 1; //in this case, i dont have any rotation, so for this one and the point, i will rotate it during cornercheck

    //case 2: dot
    if (cubit[1][2][0].back == YELLOW && cubit[0][2][1].left == YELLOW && cubit[1][2][2].front == YELLOW && cubit[2][2][1].right == YELLOW)
        edgecase = 2;

    if (edgecase == 0) //if false, I have already my case so I dont do anything
        for (let i = 0; i < 4; i++) //first I check the edgecase, then I rotate it to put it in right way, then I find the cornercase, and I (y)change the algorithm to find his wanted form
    { //determine edgecase(with rotation needed)
        //case 3: I-line (standing)
        if (cubit[1][2][0].up == YELLOW && cubit[0][2][1].left == YELLOW && cubit[1][2][2].up == YELLOW && cubit[2][2][1].right == YELLOW) {
            edgecase = 3;
            break;
        } //Im breaking now so I keep the rotation that way
        //case 4: L (top left)
        if (cubit[1][2][0].up == YELLOW && cubit[0][2][1].up == YELLOW && cubit[1][2][2].front == YELLOW && cubit[2][2][1].right == YELLOW) {
            edgecase = 4;
            break;
        }
        alg("Y");
    }
    //cout<<edgecase<<endl;
    //now I need to find the cornercase: no rotations, unless for cross and dot
    if (cubit[0][2][0].up == YELLOW && cubit[2][2][0].up == YELLOW && cubit[2][2][2].up == YELLOW && cubit[0][2][2].up == YELLOW)
        cornercase = 1; //all up

    if (cubit[0][2][0].left == YELLOW && cubit[2][2][0].up == YELLOW && cubit[2][2][2].right == YELLOW && cubit[0][2][2].front == YELLOW)
        cornercase = 2; //2 to 5 is one up with the one underneath pointing right
    if (cubit[0][2][0].left == YELLOW && cubit[2][2][0].back == YELLOW && cubit[2][2][2].up == YELLOW && cubit[0][2][2].front == YELLOW)
        cornercase = 3;
    if (cubit[0][2][0].left == YELLOW && cubit[2][2][0].back == YELLOW && cubit[2][2][2].right == YELLOW && cubit[0][2][2].up == YELLOW)
        cornercase = 4;
    if (cubit[0][2][0].up == YELLOW && cubit[2][2][0].back == YELLOW && cubit[2][2][2].right == YELLOW && cubit[0][2][2].front == YELLOW)
        cornercase = 5;

    if (cubit[0][2][0].back == YELLOW && cubit[2][2][0].up == YELLOW && cubit[2][2][2].front == YELLOW && cubit[0][2][2].left == YELLOW)
        cornercase = 6; //6 to 9 is one up with the one underneath pointing down
    if (cubit[0][2][0].back == YELLOW && cubit[2][2][0].right == YELLOW && cubit[2][2][2].up == YELLOW && cubit[0][2][2].left == YELLOW)
        cornercase = 7;
    if (cubit[0][2][0].back == YELLOW && cubit[2][2][0].right == YELLOW && cubit[2][2][2].front == YELLOW && cubit[0][2][2].up == YELLOW)
        cornercase = 8;
    if (cubit[0][2][0].up == YELLOW && cubit[2][2][0].right == YELLOW && cubit[2][2][2].front == YELLOW && cubit[0][2][2].left == YELLOW)
        cornercase = 9;

    if (cubit[0][2][0].up == YELLOW && cubit[2][2][0].up == YELLOW && cubit[2][2][2].right == YELLOW && cubit[0][2][2].left == YELLOW)
        cornercase = 10; //2 adjacents up, other are pointing outward
    if (cubit[0][2][0].back == YELLOW && cubit[2][2][0].up == YELLOW && cubit[2][2][2].up == YELLOW && cubit[0][2][2].front == YELLOW)
        cornercase = 11;
    if (cubit[0][2][0].left == YELLOW && cubit[2][2][0].right == YELLOW && cubit[2][2][2].up == YELLOW && cubit[0][2][2].up == YELLOW)
        cornercase = 12;
    if (cubit[0][2][0].up == YELLOW && cubit[2][2][0].back == YELLOW && cubit[2][2][2].front == YELLOW && cubit[0][2][2].up == YELLOW)
        cornercase = 13;

    if (cubit[0][2][0].up == YELLOW && cubit[2][2][0].up == YELLOW && cubit[2][2][2].front == YELLOW && cubit[0][2][2].front == YELLOW)
        cornercase = 14; //2 adjacents up, the other are pointing the opposite way
    if (cubit[0][2][0].left == YELLOW && cubit[2][2][0].up == YELLOW && cubit[2][2][2].up == YELLOW && cubit[0][2][2].left == YELLOW)
        cornercase = 15;
    if (cubit[0][2][0].back == YELLOW && cubit[2][2][0].back == YELLOW && cubit[2][2][2].up == YELLOW && cubit[0][2][2].up == YELLOW)
        cornercase = 16;
    if (cubit[0][2][0].up == YELLOW && cubit[2][2][0].right == YELLOW && cubit[2][2][2].right == YELLOW && cubit[0][2][2].up == YELLOW)
        cornercase = 17;

    if (cubit[0][2][0].left == YELLOW && cubit[2][2][0].up == YELLOW && cubit[2][2][2].front == YELLOW && cubit[0][2][2].up == YELLOW)
        cornercase = 18; //2 up are opposite
    if (cubit[0][2][0].up == YELLOW && cubit[2][2][0].back == YELLOW && cubit[2][2][2].up == YELLOW && cubit[0][2][2].left == YELLOW)
        cornercase = 19;
    if (cubit[0][2][0].back == YELLOW && cubit[2][2][0].up == YELLOW && cubit[2][2][2].right == YELLOW && cubit[0][2][2].up == YELLOW)
        cornercase = 20;
    if (cubit[0][2][0].up == YELLOW && cubit[2][2][0].right == YELLOW && cubit[2][2][2].up == YELLOW && cubit[0][2][2].front == YELLOW)
        cornercase = 21;

    if (cubit[0][2][0].back == YELLOW && cubit[2][2][0].back == YELLOW && cubit[2][2][2].right == YELLOW && cubit[0][2][2].left == YELLOW)
        cornercase = 22; //none is up, two adjacent are facing a way, others are faing opposite way
    if (cubit[0][2][0].back == YELLOW && cubit[2][2][0].right == YELLOW && cubit[2][2][2].right == YELLOW && cubit[0][2][2].front == YELLOW)
        cornercase = 23;
    if (cubit[0][2][0].left == YELLOW && cubit[2][2][0].right == YELLOW && cubit[2][2][2].front == YELLOW && cubit[0][2][2].front == YELLOW)
        cornercase = 24;
    if (cubit[0][2][0].left == YELLOW && cubit[2][2][0].back == YELLOW && cubit[2][2][2].front == YELLOW && cubit[0][2][2].left == YELLOW)
        cornercase = 25;

    if (cubit[0][2][0].back == YELLOW && cubit[2][2][0].back == YELLOW && cubit[2][2][2].front == YELLOW && cubit[0][2][2].front == YELLOW)
        cornercase = 26; //none is up, they are by couples of pointing in the same way
    if (cubit[0][2][0].left == YELLOW && cubit[2][2][0].right == YELLOW && cubit[2][2][2].right == YELLOW && cubit[0][2][2].left == YELLOW)
        cornercase = 27;
    //cout<<"cornercase = "<<cornercase<<" and edgecase = "<<edgecase<<endl;


    //now I must deal with those info
    switch (edgecase) {
        case 1: //cross
            switch (cornercase) {
                case 2:
                    alg("Y"); //if Im here I will do all the next because no break;
                case 3:
                    alg("Y");
                case 4:
                    alg("Y");
                case 5:
                    alg("ruRurUUR");
                    break;

                case 9:
                    alg("Y");
                case 6:
                    alg("Y");
                case 7:
                    alg("Y");
                case 8:
                    alg("RUrURUUr");
                    break;

                case 12:
                    alg("Y");
                case 13:
                    alg("Y");
                case 10:
                    alg("Y");
                case 11:
                    alg("XLUruxlFRf");
                    break;

                case 17:
                    alg("Y");
                case 14:
                    alg("Y");
                case 15:
                    alg("Y");
                case 16:
                    alg("rUURFuruRUf");
                    break;

                case 19:
                    alg("Y");
                case 20:
                    alg("Y");
                case 21:
                    alg("Y");
                case 18:
                    alg("XuLUrulURx");
                    break;

                case 22:
                    alg("Y");
                case 23:
                    alg("Y");
                case 24:
                    alg("Y");
                case 25:
                    alg("RUURRuRRuRRUUR");
                    break;

                case 27:
                    alg("Y");
                case 26:
                    alg("RUUruRUruRur");
                    break;
            }
            break;

        case 2: //dot
            switch (cornercase) {
                case 1:
                    alg("MURUruMMURuxl");
                    break;

                case 3:
                    alg("Y");
                case 4:
                    alg("Y");
                case 5:
                    alg("Y");
                case 2:
                    alg("ZBRUruzbUFRUruf");
                    break;

                case 8:
                    alg("Y");
                case 9:
                    alg("Y");
                case 6:
                    alg("Y");
                case 7:
                    alg("ZBRUruzbuFRUruf");
                    break;

                case 11:
                    alg("Y");
                case 12:
                    alg("Y");
                case 13:
                    alg("Y");
                case 10:
                    alg("MURUruXLRRFRf");
                    break;

                case 16:
                    alg("Y");
                case 17:
                    alg("Y");
                case 14:
                    alg("Y");
                case 15:
                    alg("RUURRFRfUUXLrURuxl");
                    break;

                case 20:
                    alg("Y");
                case 21:
                    alg("Y");
                case 18:
                    alg("Y");
                case 19:
                    alg("RUrUrFRfUUrFRf");
                    break;

                case 22:
                    alg("Y");
                case 23:
                    alg("Y");
                case 24:
                    alg("Y");
                case 25:
                    alg("FRUrufZBRUruzb");
                    break;

                case 26:
                    alg("Y");
                case 27:
                    alg("RUURRFRfUUrFRf");
                    break;
            }
            break;

        case 3: //I-shape
            switch (cornercase) {
                case 1:
                    alg("YRUruXLrURuxl");
                    break;

                case 3:
                    alg("YY");
                case 5:
                    alg("YXLUxlRUruXLuxl");
                    break;
                case 4:
                    alg("YY");
                case 2:
                    alg("YrFRUrfRFuf");
                    break;

                case 6:
                    alg("YY");
                case 8:
                    alg("YXruxRluLUXrUxR");
                    break;
                case 9:
                    alg("YY");
                case 7:
                    alg("YLfluLFlfUF");
                    break;

                case 12:
                    alg("YY");
                case 10:
                    alg("YRUrurFRf");
                    break;
                case 11:
                    alg("YY");
                case 13:
                    alg("YFRUrurfXLURuxl");
                    break;

                case 15:
                    alg("YY");
                case 17:
                    alg("rurFRfUR");
                    break;
                case 16:
                    alg("YY");
                case 14:
                    alg("YFRUruf");
                    break;

                case 19:
                    alg("YY");
                case 21:
                    alg("YRbruRUBur");
                    break;
                case 20:
                    alg("YY");
                case 18:
                    alg("YrFRUrufUR");
                    break;

                case 22:
                    alg("YY");
                case 24:
                    alg("YZBRUruRUruzb");
                    break;
                case 25:
                    alg("YY");
                case 23:
                    alg("ruRuryUrURB");
                    break;

                case 27:
                    alg("YXLUUruRRxlUruXLuxl");
                    break;
                case 26:
                    alg("YFRUruRfXLUruxl");
                    break;
            }
            break;

        case 4: //L-shape
            switch (cornercase) {
                case 1:
                    alg("XLUruRxlURur");
                    break;

                case 2:
                    alg("yxluRurUUXL");
                    break;
                case 3:
                    alg("RUrurFRRUruf");
                    break;
                case 4:
                    alg("YYFRUrufUFRUruf");
                    break;
                case 5:
                    alg("YXLUUruRuxl");
                    break;

                case 6:
                    alg("XLUrUrFRfRUUxl");
                    break;
                case 7:
                    alg("yRUrUrFRfRUUr");
                    break;
                case 8:
                    alg("XLUrURUUxl");
                    break;
                case 9:
                    alg("YYxlUURUrUXL");
                    break;

                case 10:
                    alg("YruFURurfR");
                    break;
                case 11:
                    alg("RUruRurfuFRUr");
                    break;
                case 12:
                    alg("YYZBRURRurURRurzb");
                    break; //algorithm may be bullshit
                case 13:
                    alg("YYRUburURBr");
                    break;

                case 14:
                    alg("yburURB");
                    break;
                case 15:
                    alg("yruRurUURFRUruf");
                    break;
                case 16:
                    alg("RUrURUUrFRUruf");
                    break;
                case 17:
                    alg("YYZBRUruzb");
                    break;

                case 18:
                    alg("yruRurURURbrB");
                    break;
                case 19:
                    alg("YYRUURRFRfRUUr");
                    break;
                case 20:
                    alg("RUrURururFRf");
                    break;
                case 21:
                    alg("FRuruRUrf");
                    break;

                case 22:
                    alg("YZfurURurURzF");
                    break; //bullshit algorithm
                case 23:
                    alg("YYxlUXXLLuXXLLuXXLLUxl");
                    break;
                case 24:
                    alg("yRbRRFRRBRRfR");
                    break;
                case 25:
                    alg("FRUruRUruf");
                    break;

                case 26:
                    alg("XLUUruRUruRuxl");
                    break;
                case 27:
                    alg("yxlUURUruRUrUXL");
                    break;
            }
            break;
    }

}

function solvepll() {
    //here, only 21 case, so I better check them 1 by 1, then Y till I find one
    //cout<<"beginning pll"<<endl;
    let i = 0;
    //checking if the color correspond to the center color for all pieces
    while (i < 4) { //since they are oriented, one check is enough to know what piece it is
        //cout<<i<<endl;
        i++;
        //but I dont know if the face is correctly oriented with underneath so I cant compare the colors with those
        if (cubit[0][2][0].back == cubit[2][2][1].right && cubit[2][2][0].right == cubit[1][2][2].front && cubit[0][2][1].left == cubit[0][2][2].left && cubit[1][2][2].front == cubit[0][2][2].front && cubit[0][2][2].front == cubit[1][2][2].front && cubit[2][2][0].back == cubit[2][2][1].right) {
            alg("XrUrDDRurDDRRx");
            break;
        } else if (cubit[0][2][0].back == cubit[2][2][2].right && cubit[2][2][0].back == cubit[0][2][2].left && cubit[0][2][1].left == cubit[2][2][2].front && cubit[1][2][2].front == cubit[0][2][2].left) {
            alg("LUUlUULfluLULFLLU");
            break;
        } else if (cubit[0][2][0].left == cubit[2][2][2].front && cubit[0][2][2].front == cubit[1][2][0].back && cubit[2][2][1].right == cubit[2][2][2].right && cubit[1][2][2].front == cubit[2][2][2].front && cubit[2][2][2].right == cubit[2][2][1].right && cubit[2][2][0].back == cubit[0][2][1].left && cubit[0][2][2].left == cubit[2][2][2].right) {
            alg("XLuLDDlULDDLLx");
            break;
        } else if (cubit[0][2][0].back == cubit[2][2][2].right && cubit[2][2][0].back == cubit[0][2][2].left && cubit[2][2][1].right == cubit[2][2][2].front && cubit[1][2][2].front == cubit[2][2][2].right) {
            alg("rUURUUrFRUrurfRRu");
            break;
        } else if (cubit[0][2][1].left == cubit[2][2][0].right && cubit[1][2][2].front == cubit[0][2][0].left && cubit[0][2][0].back == cubit[1][2][0].back && cubit[2][2][2].front == cubit[0][2][2].front) {
            alg("FFUmUUMUFF");
            break;
        } else if (cubit[0][2][1].left == cubit[2][2][0].right && cubit[2][2][1].right == cubit[0][2][0].left && cubit[0][2][2].left == cubit[1][2][2].front && cubit[2][2][2].right == cubit[1][2][2].front) {
            alg("rUUrYurfRRurUrFRuF");
            break;
        } else if (cubit[0][2][1].left == cubit[0][2][2].front && cubit[1][2][2].front == cubit[2][2][2].right && cubit[0][2][0].back == cubit[2][2][0].back && cubit[2][2][2].front == cubit[0][2][2].front) {
            alg("FFumUUMuFF");
            break;
        } else if (cubit[0][2][0].back == cubit[2][2][1].left && cubit[0][2][2].front == cubit[0][2][1].left && cubit[2][2][0].back == cubit[2][2][1].right && cubit[2][2][2].front == cubit[2][2][1].right) {
            alg("xRurDRUrdRUrDRurXf");
            break;
        } else if (cubit[0][2][0].back == cubit[0][2][2].front && cubit[2][2][2].front == cubit[2][2][0].back && cubit[1][2][0].back == cubit[2][2][0].left && cubit[0][2][1].left == cubit[2][2][0].back) {
            alg("FRuruRUrfRUrurFRf");
            break;
        } else if (cubit[1][2][0].back == cubit[2][2][2].front && cubit[1][2][2].front == cubit[0][2][0].back && cubit[0][2][2].front == cubit[0][2][0].back && cubit[2][2][0].back == cubit[2][2][2].front) {
            alg("rUlUURuLrUlUURuL");
            break;
        } else if (cubit[0][2][1].left == cubit[0][2][0].back && cubit[1][2][0].back == cubit[0][2][0].left && cubit[1][2][2].front == cubit[2][2][2].right && cubit[2][2][1].right == cubit[2][2][2].front) {
            alg("MMUMMUmUUMMUUmUU");
            break;
        } else if (cubit[1][2][0].back == cubit[0][2][2].front && cubit[1][2][2].front == cubit[2][2][0].back && cubit[0][2][0].back == cubit[0][2][2].front && cubit[2][2][2].front == cubit[2][2][0].back) {
            alg("LuRUUlUrLuRUUlUr");
            break;
        } else if (cubit[1][2][0].back == cubit[2][2][2].front && cubit[0][2][1].left == cubit[2][2][2].right && cubit[1][2][2].front == cubit[0][2][0].back && cubit[2][2][1].right == cubit[0][2][0].left) {
            alg("MMUMMUUMMUMM");
            break;
        } else if (cubit[2][2][0].right == cubit[0][2][2].front && cubit[2][2][2].right == cubit[0][2][0].back && cubit[0][2][1].left == cubit[2][2][2].front && cubit[2][2][1].right == cubit[0][2][0].left) {
            alg("RUrurFRRuruRUrf");
            break;
        } else if (cubit[2][2][0].right == cubit[0][2][2].front && cubit[2][2][2].right == cubit[0][2][0].back && cubit[1][2][2].front == cubit[2][2][0].back && cubit[2][2][1].right == cubit[0][2][2].front && cubit[2][2][0].right == cubit[2][2][1].right) {
            alg("RUrfRUrurFRRuru");
            break;
        } else if (cubit[0][2][0].left == cubit[2][2][2].front && cubit[0][2][2].left == cubit[2][2][0].back && cubit[0][2][1].left == cubit[2][2][2].front && cubit[1][2][2].front == cubit[0][2][0].back && cubit[0][2][0].left == cubit[0][2][1].left) {
            alg("luLFluLULfLLULU");
            break;
        } else if (cubit[0][2][0].back == cubit[0][2][2].front && cubit[2][2][2].front == cubit[2][2][0].back && cubit[1][2][0].back == cubit[2][2][0].right && cubit[2][2][1].right == cubit[2][2][0].back) {
            alg("rUrYurfRRurUrFRF");
            break;
        } else if (cubit[2][2][0].back == cubit[2][2][2].front && cubit[0][2][0].back == cubit[2][2][2].right && cubit[0][2][1].left == cubit[2][2][2].front && cubit[1][2][2].front == cubit[0][2][0].left) {
            alg("RUryRRydRurUrYDRR");
            break;
        } else if (cubit[0][2][2].front == cubit[2][2][0].right && cubit[2][2][2].front == cubit[2][2][0].back && cubit[0][2][1].left == cubit[2][2][0].back && cubit[1][2][0].back == cubit[0][2][0].left) {
            alg("ruRYRRYDrURuRydRR");
            break;
        } else if (cubit[2][2][2].front == cubit[2][2][0].back && cubit[0][2][2].front == cubit[2][2][0].right && cubit[0][2][1].left == cubit[2][2][0].right && cubit[1][2][2].front == cubit[0][2][0].back) {
            alg("RRydRuRUrYDRRYRur");
            break;
        } else if (cubit[2][2][0].back == cubit[2][2][2].front && cubit[0][2][0].back == cubit[2][2][2].right && cubit[0][2][1].left == cubit[2][2][2].right && cubit[1][2][0].back == cubit[0][2][2].front) {
            alg("RRYDrUruRydRRyrUR");
            break;
        }

        alg("Y");
    }
    i = 0;
    while (!(cubit[2][2][2].front == cubit[2][1][2].front) && i < 4) {
        alg("U");
        i++;
    }
}

function isSolved() {

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            for (let k = 0; k < 3; k++) {
                if (i == 1 && j == 1)
                    continue;
                if (i == 1 && k == 1)
                    continue;
                if (j == 1 && k == 1)
                    continue;
                if (!(cubit[i][j][k].up == cubit[1][2][1].up && cubit[i][j][k].front == cubit[1][1][2].front))
                    return false;
            }
    return true;
}

function movedim(move) {
    if (move.toUpperCase() == 'R' || move.toUpperCase() == 'L' || move.toUpperCase() == 'X' || move.toUpperCase() == 'M')
        return 'x';
    if (move.toUpperCase() == 'U' || move.toUpperCase() == 'D' || move.toUpperCase() == 'Y' || move.toUpperCase() == 'E')
        return 'y';
    if (move.toUpperCase() == 'F' || move.toUpperCase() == 'B' || move.toUpperCase() == 'Z' || move.toUpperCase() == 'S')
        return 'z';

    console.log("problem in move dimension");
}

function debugtest(numtest){
    for(let i=0;i<numtest;i++)
        {
            scramble(20);
            processSolve();
            while(waitingroom.length>0)
               {
                   Rotate(waitingroom[0],1);
                   waitingroom=waitingroom.substr(1);
               }
            if(!isSolved())
                {
                    console.log("problem, algorithm =" + algorithm);
                    break;
                }
            
            if(i%100==0)
                console.log("100 done");
        }
        
}

function conj(main_element,conjug){

    
    return conjug+main_element+invertalg(conjug);
}

function commut(a,b){

    
    return a+b+invertalg(a)+invertalg(b);
}

function invertalg(alg){
    var ans="";
         for (let i = alg.length - 1; i >= 0; i--)
        ans+=oppcase(alg[i]);
    return ans;
}

function repeat(num, alg){
    var ans="";
    for(let i=0;i<num;i++)
        ans+=alg;
    return ans;
}

function preload() {
    myFont = loadFont('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf');  // Replace with the path to your font file
  }

var txt = function (p) {

    p.setup = function () {
        var canv = p.createCanvas(500, 280);
        canv.position(winwidth, 0, 'fixed');

        p.textFont('Helvetica');


        showconf = p.createCheckbox('Afficher l\'état actuel', true);
        showconf.position(winwidth + 250, 75);

        SpeedSlider = p.createSlider(0, winwidth + 40, 400, 10);
        SpeedSlider.style('width', '160px');
        SpeedSlider.position(winwidth + 10, 10);

        scrambleButton = p.createButton("mélanger");
        scrambleButton.mousePressed(scramble);
        scrambleButton.position(winwidth + 250, 15);

        solveButton = p.createButton("résoudre");
        solveButton.mousePressed(processSolve);
        solveButton.position(winwidth + 375, 15);

        autopilot = p.createCheckbox('Rotation automatique', false);
        autopilot.position(winwidth + 40, 75);





    }

    p.draw = function () {
        
        p.background(255);
                p.strokeWeight(2);
        p.fill(255);
        p.rect(0,0,p.width,120);
 
        p.fill(0);
        p.textSize(15);
        p.text("-            Vitesse           +", SpeedSlider.x-winwidth+5, SpeedSlider.y+35);

        if (autopilot.checked())
            rotation_Angle += 0.3;

        turnSpeed = 750 - SpeedSlider.value();
        


        if (showconf.checked()) { //showing current info
            p.strokeWeight(2);
            p.fill(255);
            p.rect(0, 120, p.width, p.height - 120);

            p.fill(0);

            p.fill(0);
            p.text("permutation (coins) = " + currentcornerdec, 10, 150);
            p.text("permutation (arêtes) = " + currentedgedec, 10, 180);
            p.text("signe = " + str(currentcornersign), 400, 150);
            p.text("signe = " + str(currentedgesign), 400, 180);

            var str5 = "rotation (arêtes) = (";
            var edgesum = 0;
            for (let i = 0; i < 24; i += 2) {
                edgesum += edgetag[i] % 2;
                str5 += str(edgetag[i] % 2);
                if (i < 22)
                    str5 += ",";

            }

            str5 += ")";
            p.text(str5, 10, 230);
            p.text("somme = " + str(edgesum), 400, 230);

            var str6 = "rotation (coins) = (";

            var cornersum = 0;
            for (let i = 0; i < 24; i += 3) {
                cornersum += cornertag[i] % 3;
                str6 += str(cornertag[i] % 3);
                if (i < 21)
                    str6 += ",";
            }
            str6 += ")";

            p.text(str6, 10, 260);
            p.text("somme = " + str(cornersum), 400, 260)
        } else {
            p.strokeWeight(0);
            p.fill(255);
            p.rect(0, 120, p.width, p.height - 119);

        }


    }

    p.keyPressed = function () {
        //do nothing, if I don't add this func, the global keypressed acts twice
    }
}

var textsketch = new p5(txt);
