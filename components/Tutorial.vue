<!-- Please remove this file from your project -->
<template>
  <div>
    <div class="wrapper" style="width:100px; background-color: green;">
      <!--SVG 다이렉트-->
      <div style="max-width:100px;height: 100px;background-color: red;">
        <svg width="100" height="100">
          <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
        </svg>
      </div>
      <!--SVG background image-->
      <div style="max-width:100px;height: 100px;background-color: black;">
        <div id="a"></div>
      </div>
    </div>

    <button v-on:click="image">이미지</button>
  </div>
</template>

/**

*/
<style>
#a {
  width: 100px;
  height: 100px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ccircle cx='50' cy='50' r='40' stroke='green' stroke-width='4' fill='yellow' /%3E%3C/svg%3E");
}
</style>
<script>
export default {
  name: 'NuxtTutorial',
  methods: {
    async image(event) {
      alert(123);
      //원본 dom 객체
      const originHtml = document.querySelector("html");
      const selector = '.wrapper';
      const { scrollWidth, scrollHeight } = document.querySelector(selector);

      //사본 dom 객체
      const cloneDoc = originHtml.cloneNode(true);
      const cloneHead = cloneDoc.querySelector("head");
      const cloneBody = cloneDoc.querySelector("body");

      //원본의 모든 스타일을 <style></style> 태그로 생성
      {
        const sytleSheet = document.createElement("style");
        const styleText = [];
        Array.from(document.styleSheets).forEach((i) => {
          Array.from(i.rules).forEach((rule) => (styleText.push(`${rule.cssText}`)));
        });
        sytleSheet.innerHTML = styleText.join("\n");
        cloneBody.appendChild(sytleSheet);
      }
      //스크린샷 찍을때 필요없는 기타 스크립트 밑 스타일태그 삭제
      {
        cloneHead.innerHTML = "";
      }

      try {
        const rawResponse = await fetch("/api/toimage", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            html: cloneDoc.outerHTML,
            scrollWidth,
            scrollHeight,
            selector
          }),
        });
        const blob = await rawResponse.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "capture.png";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove(); //afterwards we remove the element again
        window.URL.revokeObjectURL(url)
      } catch (e) {
        alert('이미지 다운로드 실패' + '\n' + `${e}`)
      }

    }
  }
}
</script>

