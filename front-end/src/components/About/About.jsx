import styles from "./about.module.css";

const About = () => {
  return (
    <div className={styles.about_container}>
      <div className={styles.about_img}> </div>
      <div className={styles.about_description}>
        <h3 className={styles.about_title}>About</h3>
        <div className={styles.about_container_p}>
          <p className={styles.about_p}>
            ¡Hola! Soy Macarena Castillo Ruiz, una apasionada desarrolladora
            Full Stack con un enfoque en la creación de soluciones web
            innovadoras. Mi pasión por la tecnología y mi curiosidad innata me
            han llevado a explorar diversas tecnologías y lenguajes de
            programación para desarrollar aplicaciones completas y funcionales.
          </p>
          <p className={styles.about_p}>
            He adquirido un sólido conocimiento en el desarrollo de aplicaciones
            tanto en el lado del cliente como en el servidor. He trabajado en
            entornos ágiles, colaborando con equipos multidisciplinarios para
            entregar soluciones de alta calidad en plazos ajustados.
          </p>
          <p className={styles.about_p}>
            Mi experiencia en el desarrollo Frontend abarca el uso de
            tecnologías como HTML5, CSS3 y JavaScript. Además, tengo experiencia
            en el uso de librerías y frameworks populares como React.js para
            crear interfaces de usuario intuitivas y atractivas.
          </p>
          <p className={styles.about_p}>
            En el lado del servidor, he trabajado con tecnologías como Node.js y
            Express.js para construir APIs robustas y escalables. Mi
            conocimiento en bases de datos incluye, MySQL y PostgreSQL,
            permitiéndome diseñar y mantener sistemas de almacenamiento de datos
            eficientes.
          </p>
          <p className={styles.about_p}>
            Soy un defensora entusiasta de la gestión de versiones y utilizo Git
            para mantener el control de cambios y colaborar de manera efectiva
            con otros desarrolladores. Estoy familiarizada con plataformas como
            GitHub y GitLab para facilitar la colaboración y la revisión de
            código.
          </p>
          <p className={styles.about_p}>
            Me considero una aprendiz constante y siempre estoy buscando
            oportunidades para mejorar mis habilidades y aprender nuevas
            tecnologías. Estoy entusiasmada por seguir creciendo como
            desarrolladora y enfrentar desafíos que me permitan expandir mi
            conocimiento.
          </p>
          <p className={styles.about_p}>
            Disfruto trabajar en equipo y creo que la colaboración es esencial
            para alcanzar los objetivos del proyecto. Tengo habilidades de
            comunicación efectivas y estoy abierta a recibir y dar
            retroalimentación constructiva para lograr resultados excepcionales.
          </p>
          <p className={styles.about_p}>
            Mi aplicación Food se incluye entre mis proyectos destacados. Estos
            proyectos me han permitido enfrentar desafíos técnicos y desarrollar
            soluciones creativas para resolver problemas complejos.
          </p>
          <p className={styles.about_p}>
            Estoy emocionado por formar parte de un equipo dinámico y contribuir
            a proyectos que tengan un impacto positivo en la vida de las
            personas. Mi pasión por la programación y mi dedicación me impulsan
            a seguir creciendo como desarrollador Full Stack y aportar mis
            habilidades a nuevos proyectos emocionantes.
          </p>
          <p className={styles.about_p}>
            {" "}
            Gracias por tomarte el tiempo para conocerme. Espero que esta breve
            presentación haya sido útil para entender mi perfil como
            desarrollador Full Stack. Si tienes alguna pregunta o necesitas más
            información, no dudes en contactarme. Estoy ansiosa por contribuir
            con mis habilidades y entusiasmo a proyectos desafiantes y colaborar
            en un ambiente de trabajo en equipo. Agradezco sinceramente
            cualquier oportunidad laboral que puedas considerar para mí.
          </p>
          <p className={styles.about_p}>¡Que tengas un maravilloso día!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
