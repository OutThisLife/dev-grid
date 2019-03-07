import ext from './utils/ext'

try {
  const LIVERELOAD_HOST = 'localhost:';
  const LIVERELOAD_PORT = 35729;
  const connection = new WebSocket('ws://' + LIVERELOAD_HOST + LIVERELOAD_PORT + '/livereload');

  connection.onerror = (err) => console.log('reload connection got error:', err)
  connection.onmessage = (e) => {
    if (e.data) {
      const data = JSON.parse(e.data);

      if (data && data.command === 'reload') {
        ext.runtime.reload();
      }
    }
  };
} catch (err) {
  //
}
