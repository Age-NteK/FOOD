import styles from "./about.module.css";

const About = () => {
  return (
    <div className={styles.about_container}>
      <div className={styles.about_img}> </div>
      <div className={styles.about_description}>
        <h4 className={styles.about_name}>Macarena Castillo Ruiz</h4>
        <h4 className={styles.about_dev}>Desarrolladora Full Stack</h4>
        <div className={styles.about_container_p}>
          <p className={styles.about_p}>
            Dedicada desarrolladora Full Stack con un enfoque centrado en la
            creación de soluciones web innovadoras. Poseo una experiencia en el
            desarrollo de aplicaciones tanto en el ámbito del cliente como en el
            servidor. Mi capacidad para colaborar en equipos ágiles ha permitido
            la entrega de soluciones de alta calidad. Mi especialización se
            centra en tecnologías Frontend como HTML5, CSS3 y JavaScript, así
            como en la maestría de librerías como React.js. Mi destreza en
            tecnologías del servidor, incluyendo Node.js y Express.js, está
            respaldada por un conocimiento realmente sólido.
          </p>
          <p className={styles.about_p}>
            Experiencia | Henry | 01/03/2023 - [Fecha de Finalización] -
            Desarrollo de aplicaciones web completas y funcionales en entornos
            ágiles. - Colaboración con equipos multidisciplinarios para entregar
            soluciones de alta calidad. - Uso de tecnologías Frontend como
            HTML5, CSS3 y JavaScript para crear interfaces de usuario
            atractivas. - Implementación de librerías y frameworks populares
            como React.js. - Construcción de APIs robustas y escalables
            utilizando tecnologías del lado del servidor como Node.js y
            Express.js. - Diseño y mantenimiento de sistemas de almacenamiento
            de datos eficientes con bases de datos MySQL y PostgreSQL. - Gestión
            de versiones y colaboración efectiva con Git, GitHub y GitLab. -
            Solución creativa de problemas técnicos y enfrentamiento de
            desafíos.
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
