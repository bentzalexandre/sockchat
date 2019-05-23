---


---

<h2 id="installation">Installation</h2>
<p>Pour télécharger le projet, exécuter les commande suivantes :</p>
<pre><code>git clone https://github.com/bentzalexandre/sockchat.git
git clone https://github.com/bentzalexandre/socketserver.git
</code></pre>
<p>Après avoir récupérer l’application et le serveur, entrer les commandes suivantes :</p>
<pre><code>cd sockchat
npm install
npm audit fix   ## si demandé
</code></pre>
<p>Il sera nécessaire de modifier la ligne 21 du fichier app.module.ts :</p>
<pre><code>const config: SocketIoConfig = { url: 'http://votre_IP:3001', options: {}};
</code></pre>
<h2 id="lancement-du-projet">Lancement du projet</h2>
<p>Pour lancer le projet, ouvrer deux terminaux et entrer les deux commandes suivantes :</p>
<pre><code>ionic serve -lc ## sockchat
node index.js ## socketserver
</code></pre>
<blockquote>
<p>Written with <a href="https://stackedit.io/">StackEdit</a>.</p>
</blockquote>

