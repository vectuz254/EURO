document.addEventListener('DOMContentLoaded', () => {
    const leg = document.getElementById('kickingLeg');
    const ball = document.getElementById('soccerBall');

    function executeSequence() {
        // 1. Strip existing animations to reset state
        leg.style.animation = 'none';
        ball.style.animation = 'none';

        // 2. Trigger DOM Reflow. 
        // Asking the browser for the 'offsetWidth' forces it to recalculate 
        // the layout, proving to the engine that the animation is truly gone 
        // before we reapply it on the next line.
        void leg.offsetWidth; 
        void ball.offsetWidth;

        // 3. Initiate Kicking Animation
        // Runs for 1.2 seconds using a smooth ease-in-out curve
        leg.style.animation = 'strikePhase 1.2s ease-in-out forwards';

        // 4. Time the impact. 
        // The strike hits at exactly 45% of the 1.2s animation (~540ms).
        // We delay the ball's flight by 520ms to make the impact feel heavy and realistic.
        setTimeout(() => {
            // The ball travels for 1.5s using a linear bezier to maintain velocity
            ball.style.animation = 'flightPath 1.5s linear forwards';
        }, 520); 
    }

    // Run the initial sequence
    executeSequence();

    // Loop the entire sequence every 3.5 seconds
    setInterval(executeSequence, 3500);
});
