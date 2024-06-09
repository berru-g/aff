' script + planificateur de tache = popup pour automation
Dim preset_du_jour
preset_du_jour = MsgBox("Otto:" & vbCrLf & "1. Set up" & vbCrLf & "2. Task" & vbCrLf & "3. Insta otto", vbQuestion + vbYesNoCancel, "preset_du_jour")

If preset_du_jour = vbYes Then
    Dim pageWeb, search, message
    navigateur = "firefox.exe" '
    pageWeb = "https://"
    search = "vous"
    message = "****"

    Set objShell = CreateObject("WScript.Shell")
    objShell.Run "firefox.exe" '
    WScript.Sleep 3000 ' Attendre que le navigateur s'ouvre
	
    ' ouverture
    objShell.SendKeys pageweb
	objShell.SendKeys "{ENTER}"
	WScript.Sleep 10000
	'se rechercher
	'objShell.SendKeys "{TAB 15}"  
	'objShell.SendKeys search
	'objShell.SendKeys "{ENTER}"
	'WScript.Sleep 3000
	's'ecrire
	objShell.SendKeys "{TAB}"  
	objShell.SendKeys message
	objShell.SendKeys "{ENTER}"
	WScript.Sleep 3000


ElseIf preset_du_jour = vbNo Then
Dim fichier
    fichier = "task.py"
    Set objShell = CreateObject("WScript.Shell")
    objShell.Run fichier
	WScript.Sleep 10000
ElseIf preset_du_jour = vbCancel Then
    ' Ouvrir un site en navigation privée et entrer les informations d'identification
    Dim navigateur, url, identifiant, motDePasse
    navigateur = "firefox.exe" ' ou "firefox.exe" selon votre navigateur
    url = "https://www.instagram.com"
    identifiant = "****@****"
    motDePasse = "****"

    Set objShell = CreateObject("WScript.Shell")
    objShell.Run "firefox.exe -private-window " '& url
    WScript.Sleep 2000 ' Attendre que le navigateur s'ouvre
	
    ' Automatiser la saisie du login et du mot de passe 
    objShell.SendKeys url
	objShell.SendKeys "{ENTER}"
	WScript.Sleep 5000
	'"Refuser les cookies"
	objShell.SendKeys "{TAB 15}"  
	objShell.SendKeys "{ENTER}"
	WScript.Sleep 3000
    'login
	objShell.SendKeys "{TAB 2}"
	objShell.SendKeys identifiant
    objShell.SendKeys "{TAB}"
    objShell.SendKeys motDePasse
    objShell.SendKeys "{ENTER}"
	WScript.Sleep 8000
    'feed
	objShell.SendKeys "{TAB 2}"
    objShell.SendKeys "{ENTER}"
	WScript.Sleep 2000
	'publication
	'objShell.SendKeys "{TAB 8}"
    'objShell.SendKeys "{ENTER}"
	'WScript.Sleep 2000
	'objShell.SendKeys "{TAB}"
    'objShell.SendKeys "{ENTER}"
	'scroll et like auto
    objShell.Run "scroll-like.py"
	objShell.Run "Matilda11lab.mp3"
End If
