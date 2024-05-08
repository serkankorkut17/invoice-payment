import sqlite3

# Path to your SQLite database file
sqlite_db_path = "src/utils/mydatabase.sqlite"

def verify_user_in_db(username):
    """Connect to the SQLite database and verify the user is present."""
    try:
        conn = sqlite3.connect(sqlite_db_path)
        cursor = conn.cursor()

        # Replace 'Users' with your actual table name
        cursor.execute("SELECT * FROM Users WHERE user_id = ?", (username,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        return user is not None

    except Exception as e:
        print(f"Database error: {e}")
        return False

# Test the function
is_user_present = verify_user_in_db("Tester")
if is_user_present:
    print("User found in the database!")
else:
    print("User not found in the database.")
