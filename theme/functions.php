<?php

declare(strict_types=1);
// Add theme supported features.
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
});
// Enqueue styles and scripts the right way.
add_action('wp_enqueue_scripts', function () {
    wp_deregister_script('jquery');

});
