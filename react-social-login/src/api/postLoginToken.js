export const postLoginToken = async idToken => {
    const API_URL="http://localhost:8080"
    const path='/v1/oauth2/login';
    
    try {
      const response = await fetch(`${API_URL}${path}`, {
        method: 'POST',
        credentials: 'include', // include, *same-origin, omit
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(idToken), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
      });
      if (!response.ok) throw new Error('bad server condition');
      return true;
    } catch (e) {
      console.error('postLoginToken Error: ', e.message);
      return false;
    }
};
