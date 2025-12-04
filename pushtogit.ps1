Write-Host "Running command from $PWD"

# Stage all changes
git add .

# Ask for commit message
$commitMessage = Read-Host "Enter commit message"

# Commit
git commit -am "$commitMessage"

# Push to remote
git push
