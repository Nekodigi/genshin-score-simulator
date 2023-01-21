export const Test = () => {
  let imgElement = document.getElementById("imageSrc");
  let inputElement = document.getElementById("fileInput");
  const cv = window.cv;

  inputElement.addEventListener(
    "change",
    (e) => {
      imgElement.src = URL.createObjectURL(e.target.files[0]);
    },
    false
  );
  imgElement.onload = function () {
    let mat = cv.imread(imgElement);
    cv.imshow("canvasOutput", mat);
    mat.delete();
  };
  var Module = {
    // https://emscripten.org/docs/api_reference/module.html#Module.onRuntimeInitialized
    onRuntimeInitialized() {
      document.getElementById("status").innerHTML = "OpenCV.js is ready.";
    },
  };
  return (
    <div>
      <h2>Hello OpenCV.js</h2>
      <p id="status">OpenCV.js is loading...</p>
      <div>
        <div class="inputoutput">
          <img id="imageSrc" alt="No Image" />
          <div class="caption">
            imageSrc <input type="file" id="fileInput" name="file" />
          </div>
        </div>
        <div class="inputoutput">
          <canvas id="canvasOutput"></canvas>
          <div class="caption">canvasOutput</div>
        </div>
      </div>
    </div>
  );
};
