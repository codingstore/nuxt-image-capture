# nuxt-image-capture

## nuxt의 [Custom API EndPoint](https://nuxtjs.org/docs/configuration-glossary/configuration-servermiddleware/#custom-api-endpoint) 를 이용해 화면을 이미지로 캡쳐한다.
1. 이미지로 변환하고 싶은 html을 API로 전달
2. chromium을 headless로 구동하여 html을 렌더링
3. puppeteer를 이용하여 크롬의 화면을 캡쳐


## 프로젝트 구성

`create nuxt-app`을 사용해서 프로젝트 생성

```bash
yarn create nuxt-app <project-name>
```

## API Input 정보
```json
{
  "html": "<html></html>",//변환하고싶은 HTML 전체
  "scrollWidth": 100,//캡쳐할 영역의 가로길이
  "scrollHeight": 200,//캡쳐할 영역의 세로길이
  "selector": ".wrapper",//HTML에서 이미지로 캡쳐할 dom의 selector
}
```

## API 호출
```javascript
const rawResponse = await fetch("/api/toimage", {
    method: "POST",
    headers: {
    "Accept": "application/json",
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
```