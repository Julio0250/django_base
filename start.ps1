param($project_name=$(throw "You must specify your name"))
Rename-Item test $project_name
(Get-Content manage.py) -Replace 'test', $project_name | Out-File -Encoding ASCII manage.py

Set-Location $project_name

(Get-Content settings.py) -Replace 'test', $project_name | Out-File -Encoding ASCII settings.py
(Get-Content urls.py) -Replace 'encuestas', $project_name | Out-File -Encoding ASCII urls.py
(Get-Content wsgi.py) -Replace 'encuestas', $project_name | Out-File -Encoding ASCII wsgi.py
(Get-Content asgi.py) -Replace 'encuestas', $project_name | Out-File -Encoding ASCII asgi.py