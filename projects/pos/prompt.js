const { stdin, stdout } = process;

function _prompt(question) {
  return new Promise((resolve, reject) => {
    stdin.resume();
    stdout.write(question);

    stdin.on('data', (data) => resolve(data.toString().trim()));
    stdin.on('error', (err) => reject(err));
  });
}

const prompt = async function (question) {
  try {
    const answer = await _prompt(question);
    process.stdin.pause();
    return answer;
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

export default prompt;
