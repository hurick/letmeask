import questionsIllustration from '../../assets/images/questions-illustration.svg'
import applicationLogo from '../../assets/images/logo.svg'
import googleLogo from '../../assets/images/google-logo.svg'

export const Home = () => (
  <section>
    <aside>
      <img src={questionsIllustration} alt="Question messages illustration" />
      <strong>Create live Q&amp;A rooms</strong>
      <p>Answer your audience questions in real time!</p>
    </aside>

    <main>
      <div>
        <img src={applicationLogo} alt="Letmeask's logo" />
        <button>
          <img src={googleLogo} alt="Google's logo" />
          Create your room with Google!
        </button>
      </div>

      <p>or join a created room</p>

      <form>
        <input
          type="text"
          placeholder="Insert created room number"
        />

        <button type="submit">Join room</button>
      </form>
    </main>
  </section>
)
