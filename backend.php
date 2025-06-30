<?php
session_start();

// File paths for JSON-based storage
define('USER_DATA_FILE', 'users.json');
define('DIARY_FILE', 'diary.json');
define('FITNESS_FILE', 'fitness.json');
define('ACHIEVEMENTS_FILE', 'achievements.json');
define('GOALS_FILE', 'goals.json');

// Utility function to load JSON data
function loadData($filePath) {
    if (!file_exists($filePath)) {
        return [];
    }
    return json_decode(file_get_contents($filePath), true);
}

// Utility function to save JSON data
function saveData($filePath, $data) {
    file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));
}

// Register a new user
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'signup') {
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    $users = loadData(USER_DATA_FILE);

    // Check if email already exists
    foreach ($users as $user) {
        if ($user['email'] === $email) {
            echo json_encode(['status' => 'error', 'message' => 'Email already registered.']);
            exit;
        }
    }

    // Add the new user
    $users[] = ['email' => $email, 'password' => $password];
    saveData(USER_DATA_FILE, $users);

    echo json_encode(['status' => 'success', 'message' => 'User registered successfully!']);
    exit;
}

// Login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'login') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $users = loadData(USER_DATA_FILE);

    foreach ($users as $user) {
        if ($user['email'] === $email && password_verify($password, $user['password'])) {
            $_SESSION['email'] = $email;
            echo json_encode(['status' => 'success', 'message' => 'Login successful.']);
            exit;
        }
    }

    echo json_encode(['status' => 'error', 'message' => 'Invalid credentials.']);
    exit;
}

// Logout
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'logout') {
    session_destroy();
    echo json_encode(['status' => 'success', 'message' => 'Logged out successfully.']);
    exit;
}

// Save diary entry
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'saveDiary') {
    if (!isset($_SESSION['email'])) {
        echo json_encode(['status' => 'error', 'message' => 'Not logged in.']);
        exit;
    }

    $diaryEntry = $_POST['entry'];
    $timestamp = date('Y-m-d H:i:s');

    $diary = loadData(DIARY_FILE);
    $diary[] = ['email' => $_SESSION['email'], 'entry' => $diaryEntry, 'timestamp' => $timestamp];
    saveData(DIARY_FILE, $diary);

    echo json_encode(['status' => 'success', 'message' => 'Diary entry saved.']);
    exit;
}

// Fetch past diary entries
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'getDiary') {
    if (!isset($_SESSION['email'])) {
        echo json_encode(['status' => 'error', 'message' => 'Not logged in.']);
        exit;
    }

    $diary = loadData(DIARY_FILE);
    $userEntries = array_filter($diary, function ($entry) {
        return $entry['email'] === $_SESSION['email'];
    });

    echo json_encode(['status' => 'success', 'entries' => $userEntries]);
    exit;
}

// Save fitness data
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'saveFitness') {
    if (!isset($_SESSION['email'])) {
        echo json_encode(['status' => 'error', 'message' => 'Not logged in.']);
        exit;
    }

    $steps = intval($_POST['steps']);
    $sleep = floatval($_POST['sleep']);

    $fitness = loadData(FITNESS_FILE);
    $fitness[] = ['email' => $_SESSION['email'], 'steps' => $steps, 'sleep' => $sleep, 'timestamp' => date('Y-m-d')];
    saveData(FITNESS_FILE, $fitness);

    echo json_encode(['status' => 'success', 'message' => 'Fitness data saved.']);
    exit;
}